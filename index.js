const CrawlingAPI = require('./src/crawling-api.js');
const ScraperAPI = require('./src/scraper-api.js');
const LeadsAPI = require('./src/leads-api.js');
const ScreenshotsAPI = require('./src/screenshots-api.js');

module.exports = {
  CrawlingAPI,
  ProxyCrawlAPI: CrawlingAPI, // This one is here for backward compatibility reasons
  ScraperAPI,
  LeadsAPI,
  ScreenshotsAPI,
};
