export = BaseAPI;
/**
 * The BaseAPI class which does the calls to the ProxyCrawlAPI itself.
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
declare class BaseAPI {
    /**
     * Creates a BaseAPI object. This class is not meant to be used directly but extended from subclasses.
     * @param {object} options The options to initialize the API.
     * @param {string} options.token The token to use in the API.
     * @param {number} [options.timeout=30000] The API timeout in milliseconds.
     */
    constructor(options: {
        token: string;
        timeout: number;
    });
    /**
     * Returns the base path to use on the API calls. This is used internally in the class.
     * @type string
     * @private
     */
    private get basePath();
    /**
     * The encoding use to decode the API responses. This is used internally in the class.
     * @type string
     * @default utf8
     * @private
     */
    private get responseEncoding();
    options: any;
    /**
     * Makes a request to ProxyCrawl API.
     * @param {string} path Path from the API to load.
     * @param {object} [options={}] Additional options for the request.
     * @returns {Promise}
     */
    request(path: string, options?: object): Promise<any>;
    /**
     * Decompresses and processes the response from the API.
     * @param {object} response The HTTP response object.
     * @returns {Promise}
     * @private
     */
    private processResponse;
    /**
     * Builds the url to call the API.
     * @param {string} path Path of the API to call.
     * @param {object} options Additional parameters to pass.
     * @returns {URL}
     */
    buildURL(path: string, options: object): any;
}
