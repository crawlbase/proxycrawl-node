const querystring = require('querystring');
const BaseAPI = require('./base-api.js');

/**
 * A node class that acts as wrapper for ProxyCrawl Crawling API.
 *
 * Read ProxyCrawl Crawling API documentation https://proxycrawl.com/dashboard/api/docs
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class CrawlingAPI extends BaseAPI {

  get(url, options = {}) {
    options.url = url;
    options.method = 'GET';
    return this.request('', options);
  }

  post(url, data, options = {}) {
    options.url = url;
    options.method = options.method || 'POST';
    if ('object' === typeof data && undefined !== options.postType && 'json' === options.postType) {
      data = JSON.stringify(data);
      options.postContentType = options.postContentType || 'application/json';
    } else if ('object' === typeof data) {
      data = querystring.stringify(data);
    }
    options.postData = data;
    return this.request('', options);
  }

  put(url, data, options = {}) {
    options.url = url;
    options.method = 'PUT';
    return this.post(url, data, options);
  }

}

module.exports = CrawlingAPI;
