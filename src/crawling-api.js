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
  /**
   * Makes a GET request to the Crawling API.
   * @param {string} url The url to load.
   * @param {object} [options={}] Any of the available Crawling API parameters.
   * @returns {Promise}
   */
  get(url, options = {}) {
    options.url = url;
    return this.request(this.basePath, options);
  }

  /**
   * Makes a POST request to the Crawling API.
   * @param {string} url The url to load.
   * @param {(object|string)} data The data that you want to send via POST.
   * @param {object} [options={}] Any of the available Crawling API parameters.
   * @param {string} [options.postType] If 'json', the data will be sent as JSON
   * @returns {Promise}
   */
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

  /**
   * Makes a PUT request to the Crawling API.
   * @param {string} url The url to load.
   * @param {(object|string)} data The data that you want to send via POST.
   * @param {object} [options={}] Any of the available Crawling API parameters.
   * @param {string} [options.postType] If 'json', the data will be sent as JSON
   * @returns {Promise}
   */
  put(url, data, options = {}) {
    options.url = url;
    options.method = 'PUT';
    return this.post(url, data, options);
  }

  /**
   * Processes the response from BaseAPI and parses some fields for easy access.
   * @param {object} response The response object
   * @returns {Promise}
   * @private
   */
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
