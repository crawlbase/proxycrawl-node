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
  getFromDomain(domain, options = {}) {
    options.domain = domain;
    return this.request('leads', options);
  }

  processResponse(response) {
    return super.processResponse(response).then((response) => {
      response.leads = response.json.leads;
      return response;
    });
  }
}

module.exports = LeadsAPI;
