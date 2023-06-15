// Criar um router para descobrir qual a página atual - DONE
// Rodar função na página certa
// Criar função fetchAPI que aceita receber um endpoint
// Criar uma função renderizar os cards
// Criar um função para renderizar o pokemon na pagina de detalhes

// add load spinner

const global = {
  currentPage: window.location.pathname,
  spinnerEl: document.querySelector('#spinner'),
};

async function fetchAPI(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

// Displays details on pokemon.html
async function displayPokemonDetails() {
  global.spinnerEl.classList.add('show');

  const pokemonId = window.location.search.split('=')[1];
  const pokemon = await fetchAPI(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );

  const pokemonHtml = console.log(pokemon);

  document.getElementById('pokemon-img').src =
    pokemon.sprites.other['official-artwork'].front_default;
  document.getElementById('pokemon-img').alt = pokemon.name;
  document
    .getElementById('pokemon-id')
    .append(document.createTextNode(pokemon.id));
  document
    .getElementById('pokemon-name')
    .append(
      document.createTextNode(
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      )
    );
  document
    .getElementById('pokemon-height')
    .append(document.createTextNode(`${pokemon.height / 10} m`));
  document
    .getElementById('pokemon-weight')
    .append(
      document.createTextNode(`${(pokemon.weight / 2.205).toFixed(2)} kg`)
    );

  document
    .getElementById('hp')
    .append(document.createTextNode(pokemon.stats[0].base_stat));

  document
    .getElementById('attack')
    .append(document.createTextNode(pokemon.stats[1].base_stat));

  document
    .getElementById('defense')
    .append(document.createTextNode(pokemon.stats[2].base_stat));

  document
    .getElementById('sp-attack')
    .append(document.createTextNode(pokemon.stats[3].base_stat));

  document
    .getElementById('sp-defense')
    .append(document.createTextNode(pokemon.stats[4].base_stat));

  document
    .getElementById('speed')
    .append(document.createTextNode(pokemon.stats[5].base_stat));

  global.spinnerEl.classList.remove('show');
}

function displayPokemonCard(pokemonObj) {
  const cardsContainer = document.querySelector('#cards-container');

  const pokemon = {
    id: pokemonObj.id,
    name: pokemonObj.name,
    picture: pokemonObj.sprites.other['official-artwork'].front_default,
    type: pokemonObj.types,
  };

  console.log(pokemonObj);
  console.log(pokemon.type);

  let li = document.createElement('li');
  li.classList.add('card__li');

  li.innerHTML = `
    
      <a href="pokemon.html?id=${pokemon.id}" class="card__a">
        <article class="card__article">
          <img
            src="${pokemon.picture}"
            alt="${pokemon.name}"
            class="card__img"
          />
          <header class="card__header">
            <div class="card__left">
              <span class="card__number">#${pokemon.id}</span>
              <h2 class="card__title">${pokemon.name}</h2>
            </div>
            <div class="card__right">
              <span class="card__badge">Grass</span>
              <span class="card__badge">Fire</span>
            </div>
          </header>
        </article>
      </a>
    
  `;
  cardsContainer.append(li);
}

async function getSinglePokemonFromList(pokemonList) {
  global.spinnerEl.classList.add('show');
  for (pokemon of pokemonList) {
    const pokemonObj = await fetchAPI(pokemon.url);

    // console.log(pokemonObj);
    displayPokemonCard(pokemonObj);
  }
  global.spinnerEl.classList.remove('show');
}

async function getPokemonList() {
  const { results } = await fetchAPI('https://pokeapi.co/api/v2/pokemon');

  // console.log(results);

  getSinglePokemonFromList(results);
}

function init() {
  // Router to run functions on different pages
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      getPokemonList();
      break;
    case '/pokemon.html':
      displayPokemonDetails();
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
