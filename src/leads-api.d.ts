export = LeadsAPI;
/**
 * A node class that acts as wrapper for ProxyCrawl Leads API.
 *
 * Read ProxyCrawl Leads API documentation https://proxycrawl.com/docs/leads-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
declare class LeadsAPI extends BaseAPI {
    /**
     * Get leads from a specific domain.
     * @param {string} domain The domain to find leads from.
     * @param {object} [options={}] Additional parameters to pass to the API.
     * @returns {Promise}
     */
    getFromDomain(domain: string, options?: object): Promise<any>;
}
import BaseAPI = require("./base-api.js");
