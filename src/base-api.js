const https = require('https');
const zlib = require('zlib');
const { URL } = require('url');
const { defaults } = require('./config.js');
const { snakeCase, lowerHeaders } = require('./utils.js');

const _APIURL_ = 'https://api.proxycrawl.com/';

/**
 * The BaseAPI class which does the calls to the ProxyCrawlAPI itself.
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class BaseAPI {

  get basePath() {
    return '';
  }

  constructor(options) {
    if (undefined === options.token || '' === options.token) {
      throw new Error('Token is required to use the API, please pass token option');
    }

    this.options = options;
    this.options.timeout = this.options.timeout || defaults.timeout;
  }

  request(path, options = {}) {
    const url = this.buildURL(path, options);

    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Encoding': 'gzip,deflate'
    };
    if (('POST' === options.method || 'PUT' === options.method) && '' !== options.postData) {
      headers['Content-Type'] = options.postContentType || defaults.postContentType;
      headers['Content-Length'] = Buffer.byteLength(options.postData);
    }
    const requestOptions = {
      method: options.method || 'GET',
      host: url.host,
      path: url.pathname + url.search,
      headers
    };
    return new Promise((resolve, reject) => {
      const request = https.request(requestOptions, (response) => this.processResponse(response).then(resolve).catch(reject));
      request.setTimeout(this.options.timeout, () => request.destroy('Request timeout'));
      request.on('error', reject);
      if (('POST' === options.method || 'PUT' === options.method) && '' !== options.postData) {
        request.write(options.postData);
      }
      request.end();
    });
  }

  processResponse(response) {
    response.headers = lowerHeaders(response.headers);
    response.url = response.headers.url;

    return new Promise((resolve, reject) => {
      let encoding = response.headers['content-encoding'];
      if ('gzip' === encoding || 'deflate' === encoding) {
        const pipe = zlib[encoding === 'gzip' ? 'createGunzip' : 'createInflate']();
        const buffer = [];
        response.pipe(pipe);
        pipe.on('data', (data) => buffer.push(data.toString()));
        pipe.on('end', () => {
          response.body = buffer.join('');
          if (response.headers['content-type'] && response.headers['content-type'].indexOf('json') > -1) {
            response.json = JSON.parse(response.body);
            response.url = response.json.url;
          }
          return resolve(response);
        });
        pipe.on('error', (error) => {
          response.statusCode = 400;
          response.body = 'Error unzipping response';
          return reject(error);
        });
      } else {
        let rawData = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => rawData += chunk);
        response.on('end', () => {
          response.body = rawData;
          if (response.headers['content-type'] && response.headers['content-type'].indexOf('json') > -1) {
            response.json = JSON.parse(response.body);
            response.url = response.json.url;
          }
          return resolve(response);
        });
      }
    });
  }

  buildURL(path, options) {
    let url = _APIURL_ + path + '?token=' + this.options.token;

    for (const [key, value] of Object.entries(options)) {
      if ('method' === key) {
        continue;
      }
      url += '&' + snakeCase(key) + '=' + encodeURIComponent(value);
    }

    if (undefined === URL) { // Fix for older node versions
      const urlModule = require('url');
      return urlModule.parse(url);
    }
    return new URL(url);
  }

}

module.exports = BaseAPI;
