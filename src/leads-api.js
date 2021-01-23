const BaseAPI = require('./base-api.js');

/**
 * A node class that acts as wrapper for ProxyCrawl Leads API.
 *
 * Read ProxyCrawl Leads API documentation https://proxycrawl.com/docs/leads-api
 *
 * Copyright ProxyCrawl
 * Licensed under the Apache License 2.0
 */
class LeadsAPI extends BaseAPI {
  /**
   * Get leads from a specific domain.
   * @param {string} domain The domain to find leads from.
   * @param {object} [options={}] Additional parameters to pass to the API.
   * @returns {Promise}
   */
  getFromDomain(domain, options = {}) {
    options.domain = domain;
    return this.request('leads', options);
  }

  /**
   * Processes the response from BaseAPI and parses some fields for easy access.
   * @param {object} response The response object
   * @returns {Promise}
   * @private
   */
  processResponse(response) {
    return super.processResponse(response).then((response) => {
      response.leads = response.json.leads;
      return response;
    });
  }
}

module.exports = LeadsAPI;
