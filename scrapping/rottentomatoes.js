const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [`--window-size=1980,1080`]
    });
    const page = await browser.newPage();
    await page.goto('https://www.rottentomatoes.com/browse/opening');

    const elements = await page.$$('.mb-movie');

    let i = 0;
    for (const element of elements) {
        try {
            const title = await element.$eval('.movieTitle', el => el.innerHTML);
            await element.screenshot({ path: `${__dirname}/screenshots/${i}-${title.replace(/ /g, '_')}.png`, type: 'png' });

            i++;
        } catch (error) {
            console.log(error)
        }
    }

    await browser.close();
})();
