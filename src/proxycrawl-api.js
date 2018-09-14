const https = require('https');
const zlib = require('zlib');
const querystring = require('querystring');
const { URL } = require('url');
const { defaults } = require('./config.js');
const { snakeCase } = require('./utils.js');

const _APIURL_ = 'https://api.proxycrawl.com/';

/**
 * A node class that acts as wrapper for ProxyCrawl API.
 *
 * Read ProxyCrawl API documentation https://proxycrawl.com/dashboard/docs
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class ProxyCrawlAPI {

  constructor(options) {
    if (undefined === options.token || '' === options.token) {
      return console.error('Token is required to use the API, please pass token option');
    }

    this.options = options;
    this.options.timeout = this.options.timeout || defaults.timeout;
  }

  get(url, options = {}) {
    options.method = 'GET';
    return this.request(url, options);
  }

  post(url, data, options = {}) {
    options.method = options.method || 'POST';
    if ('object' === typeof data && undefined !== options.postType && 'json' === options.postType) {
      data = JSON.stringify(data);
      options.postContentType = options.postContentType || 'application/json';
    } else if ('object' === typeof data) {
      data = querystring.stringify(data);
    }
    options.postData = data;
    return this.request(url, options);
  }

  put(url, data, options = {}) {
    options.method = 'PUT';
    return this.post(url, data, options);
  }

  request(url, options = {}) {
    url = this.buildURL(url, options);

    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Encoding': 'gzip,deflate'
    };
    if (('POST' === options.method || 'PUT' === options.method) && '' !== options.postData) {
      headers['Content-Type'] = options.postContentType || defaults.postContentType;
      headers['Content-Length'] = Buffer.byteLength(options.postData);
    }
    const requestOptions = {
      method: options.method,
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
    response.headers = this.lowerHeaders(response.headers);
    response.originalStatus = response.headers.original_status * 1;
    response.pcStatus = response.headers.pc_status * 1;
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
            response.originalStatus = response.json.original_status * 1;
            response.pcStatus = response.json.pc_status * 1;
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
            response.originalStatus = response.json.original_status * 1;
            response.pcStatus = response.json.pc_status * 1;
            response.url = response.json.url;
          }
          return resolve(response);
        });
      }
    });
  }

  buildURL(url, options) {
    url = encodeURIComponent(url);
    url = _APIURL_ + '?token=' + this.options.token + '&url=' + url;

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

  lowerHeaders(headers) {
    const result = {};
    for (const [key, value] of Object.entries(headers)) {
      result[key.toLowerCase()] = value;
    }
    return result;
  }

}

module.exports = ProxyCrawlAPI;
