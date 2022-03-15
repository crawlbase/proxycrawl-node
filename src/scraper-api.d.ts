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
    /**
     * POST is not allowed.
     * @throws {Error}
     */
    post(): void;
    /**
     * PUT is not allowed.
     * @throws {Error}
     */
    put(): void;
}
import CrawlingAPI = require("./crawling-api.js");
