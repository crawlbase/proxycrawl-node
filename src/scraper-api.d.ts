export = ScraperAPI;
/**
 * A node class that acts as wrapper for ProxyCrawl Scraper API.
 *
 * Read ProxyCrawl Scraper API documentation https://proxycrawl.com/docs/scraper-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
declare class ScraperAPI extends CrawlingAPI {
    constructor(options: {
        token: string;
        timeout?: number;
    });
}
import CrawlingAPI = require("./crawling-api.js");
