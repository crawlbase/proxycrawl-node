const CrawlingAPI = require('./src/crawling-api.js');
const LeadsAPI = require('./src/leads-api.js');

module.exports = {
  CrawlingAPI,
  ProxyCrawlAPI: CrawlingAPI, // This one is here for backward compatibility reasons
  LeadsAPI,
};
