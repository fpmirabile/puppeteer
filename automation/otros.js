
  // it('Should be a pokemon box content', async () => {

  // });

  // it('Should go to the pokemon detail page', async() => {
  //   await page.waitForSelector(selectors.pokemonSearchField);

  //   // Primero vamos a seleccionar un pokemon de todos
  //   await page.focus(selectors.pokemonSearchField);
  //   await page.keyboard.type('*');

  //   await page.waitForSelector(selectors.pokemonCard);
  //   let pokemons = await page.$$eval(selectors.pokemonCard);
  //   // Obviamente, si tenemos 0 pokemons hay algo mal.
  //   expect(pokemons.length).toBeGreaterThan(0);

  //   let randomNumber = Math.random(Math.random() * Math.floor(pokemons.length - 1));
  //   // Clickeamos en un pokemon cualquiera
  //   await pokemons[randomNumber].click();
  //   // Esperamos que la pagina cargue
  //   await page.waitForNavigation({waitUntil: 'networkidle0'});

  //   // Chequeamos que la card sea totalmente valida
    
  // });

  // it('Should be a pokemon box content', async () => {

  // });

  

  // it('Should not find any pokemon', async () => {
  //   await page.waitForSelector(selectors.pokemonSearchField);
  //   await page.focus(selectors.pokemonSearchField);
  //   // Escribimos cualquier cosa
  //   await page.keyboard.type('Asfjagjsafaf');
  //   // Presionamos enter
  //   await page.keyboard.press('Enter');

  //   let resultSet = await page.$$(selectors.pokemonCard);
  //   // No deberia haber resultados
  //   expect(resultSet.length).toBeLessThan(0);
  // }); 