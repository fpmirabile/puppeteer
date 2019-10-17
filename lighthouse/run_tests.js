const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const fs = require('fs');

(async() => {

  const simpleConfig =  {
    extends: 'lighthouse:default',
    settings: {
      onlyAudits: [
        'first-meaningful-paint',
        'speed-index',
        'first-cpu-idle',
        'interactive',
      ],
    },
  };
  const initialURL = 'http://localhost:3000';

  const opts = {
    //chromeFlags: ['--headless'],
    logLevel: 'info',
    output: 'json',
    disableDeviceEmulation: true,
    defaultViewport: {
      width: 1200,
      height: 900
    },
    chromeFlags: ['--disable-mobile-emulation']
  };

  // Launch chrome using chrome-launcher
  const chrome = await chromeLauncher.launch(opts);
  opts.port = chrome.port;

  // Connect to it using puppeteer.connect().
  const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
  const {webSocketDebuggerUrl} = JSON.parse(resp.body);
  const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});


  //Puppeteer
  let page = (await browser.pages())[0];
  await page.setViewport({ width: 1200, height: 900});
  await page.goto(initialURL, {waitUntil: 'networkidle2'});
  await page
  .waitForSelector('#pokemon-number-807')
  .then(() => console.log('Pokemon loaded'));

  console.log(page.url());

  // Run Lighthouse.
  const report = await lighthouse(page.url(), opts, config).then(results => {
    return results;
  });
  const html = reportGenerator.generateReport(report.lhr, 'html');
  const json = reportGenerator.generateReport(report.lhr, 'json');

  // console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(', ')}`);

  console.log(`Test para details`);

  await page.evaluate(() => {
    document.querySelector('[id="pokemon-number-807"]').click();
  });

  console.log(`flag`);

  console.log(page.url());

  // Run Lighthouse.
  const detailReport = await lighthouse(page.url(), opts, config).then(results => {
    return results;
  });

  console.log(`flag`);

  const detailhtml = reportGenerator.generateReport(detailReport.lhr, 'html');
  const detailjson = reportGenerator.generateReport(detailReport.lhr, 'json');

  console.log(`fin test para details`);

  await browser.disconnect();
  await chrome.kill();

  //Write report html to the file
  fs.writeFile('lighthouse/report.html', html, (err) => {
    if (err) {
      console.error(err);
    }
  });

  //Write report json to the file
  fs.writeFile('lighthouse/report.json', json, (err) => {
    if (err) {
      console.error(err);
    }
  });

  //Write report html to the file
  fs.writeFile('lighthouse/detail-report.html', detailhtml, (err) => {
    if (err) {
      console.error(err);
    }
  });

  //Write report json to the file
  fs.writeFile('lighthouse/detail-report.json', detailjson, (err) => {
    if (err) {
      console.error(err);
    }
  });

})();
