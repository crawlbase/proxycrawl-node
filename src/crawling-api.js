const querystring = require('querystring');
const BaseAPI = require('./base-api.js');

/**
 * A node class that acts as wrapper for ProxyCrawl Crawling API.
 *
 * Read ProxyCrawl Crawling API documentation https://proxycrawl.com/docs/crawling-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class CrawlingAPI extends BaseAPI {
  get(url, options = {}) {
    options.url = url;
    return this.request(this.basePath, options);
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
    return this.request(this.basePath, options);
  }

  put(url, data, options = {}) {
    options.url = url;
    options.method = 'PUT';
    return this.post(url, data, options);
  }

  processResponse(response) {
    return super.processResponse(response).then((response) => {
      if (undefined !== response.headers && undefined !== response.headers.original_status) {
        response.originalStatus = response.headers.original_status * 1;
        response.pcStatus = response.headers.pc_status * 1;
      } else if (undefined !== response.json) {
        response.originalStatus = response.json.original_status * 1;
        response.pcStatus = response.json.pc_status * 1;
      }
      return response;
    });
  }
}

module.exports = CrawlingAPI;
