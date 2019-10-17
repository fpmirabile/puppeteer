const puppeteer = require('puppeteer');
const utils = require('./utils');

(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.setUserAgent('bot');
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://github.com/GoogleChrome/puppeteer');
  
  const issues = await page.$eval(
    '.reponav a[href="/GoogleChrome/puppeteer/issues"] .Counter',
    el => el.textContent.trim());
  const commits = await page.$eval(
    '.numbers-summary .commits .num',
    el => el.textContent.trim());
  const lastUpdate = await page.$eval(
    '.commit-tease relative-time',
    el => el.getAttribute('datetime').trim());

  const data = {
      issues,
      commits,
      lastUpdate,
      processDate: new Date()
  }

  await utils.saveJsonFile(data, 'data.json');

  await browser.close();
})();