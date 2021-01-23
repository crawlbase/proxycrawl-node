export = CrawlingAPI;
/**
 * A node class that acts as wrapper for ProxyCrawl Crawling API.
 *
 * Read ProxyCrawl Crawling API documentation https://proxycrawl.com/docs/crawling-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
declare class CrawlingAPI extends BaseAPI {
    constructor(options: {
        token: string;
        timeout?: number;
    });
    /**
     * Makes a GET request to the Crawling API.
     * @param {string} url The url to load.
     * @param {object} [options={}] Any of the available Crawling API parameters.
     * @returns {Promise}
     */
    get(url: string, options?: object): Promise<any>;
    /**
     * Makes a POST request to the Crawling API.
     * @param {string} url The url to load.
     * @param {(object|string)} data The data that you want to send via POST.
     * @param {object} [options={}] Any of the available Crawling API parameters.
     * @param {string} [options.postType] If 'json', the data will be sent as JSON
     * @returns {Promise}
     */
    post(url: string, data: (object | string), options?: {
        postType: string;
    }): Promise<any>;
    /**
     * Makes a PUT request to the Crawling API.
     * @param {string} url The url to load.
     * @param {(object|string)} data The data that you want to send via POST.
     * @param {object} [options={}] Any of the available Crawling API parameters.
     * @param {string} [options.postType] If 'json', the data will be sent as JSON
     * @returns {Promise}
     */
    put(url: string, data: (object | string), options?: {
        postType: string;
    }): Promise<any>;
}
import BaseAPI = require("./base-api.js");
