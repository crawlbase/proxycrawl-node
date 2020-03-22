const CrawlingAPI = require('./src/crawling-api.js');

module.exports = {
  CrawlingAPI,
  ProxyCrawlAPI: CrawlingAPI, // This one is here for backward compatibility reasons
};
