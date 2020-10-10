const CrawlingAPI = require('./crawling-api.js');

/**
 * A node class that acts as wrapper for ProxyCrawl Scraper API.
 *
 * Read ProxyCrawl Scraper API documentation https://proxycrawl.com/docs/scraper-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class ScraperAPI extends CrawlingAPI {

  get basePath() {
    return 'scraper';
  }

}

module.exports = ScraperAPI;
