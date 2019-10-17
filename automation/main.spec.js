const puppeteer = require('puppeteer');

const URL = 'http://localhost:3000';

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

describe('Pokedex Tests', () => {
  let browser = null;
  let page = null;

  let selectors = {
    pokemonSearchField: '#pokemon-search',
    pokemonCard: '.MuiPaper-root, .MuiCard-root',
    pokemonTitle: '.MuiTypography-h5'
  };


  beforeEach(async () => {
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: null,
      args: ['--window-size=1980,1080']
    });
    page = await browser.newPage();
    await page.goto(URL);
  });

  afterEach(async () => {
    await browser.close();
  });

  it('Should find charmander', async () => {
    await page.waitForSelector(selectors.pokemonSearchField);
    // Escribiendo en el input
    await page.focus(selectors.pokemonSearchField);
    await page.keyboard.type('Charmander');
    // Apretamos Enter 
    await page.keyboard.press('Enter');
    // Vemos el resultado
    let resultSet = await page.$$(selectors.pokemonCard);
    // Solo un charmander, por lo que se
    expect(resultSet.length).toBe(1);

    let resultTitle = await resultSet[0].$eval(selectors.pokemonTitle, e => e.innerText);
    expect(resultTitle).toEqual("charmander");
  });
});