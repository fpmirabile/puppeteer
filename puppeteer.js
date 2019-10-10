const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

const report = await lighthouse('http://google.com').then(results => {
  return results;
});

const html = reportGenerator.generateReport(report.lhr, 'html');
