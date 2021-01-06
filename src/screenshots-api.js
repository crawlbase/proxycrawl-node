const BaseAPI = require('./base-api.js');

/**
 * A node class that acts as wrapper for ProxyCrawl Screenshots API.
 *
 * Read ProxyCrawl Screenshots API documentation https://proxycrawl.com/docs/screenshots-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class ScreenshotsAPI extends BaseAPI {
  get basePath() {
    return 'screenshots';
  }

  get responseEncoding() {
    return 'binary';
  }

  get(url, options = {}) {
    options.url = url;
    return this.request(this.basePath, options);
  }
}

module.exports = ScreenshotsAPI;
