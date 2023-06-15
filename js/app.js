// Criar um router para descobrir qual a página atual - DONE
// Rodar função na página certa
// Criar função fetchAPI que aceita receber um endpoint
// Criar uma função renderizar os cards
// Criar um função para renderizar o pokemon na pagina de detalhes
const global = {
  currentPage: window.location.pathname,
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

// https://pokeapi.co/api/v2/pokemon/1/

// async function singlePokemon(endpoint) {
//   const pokemon = await fetchAPI(endpoint);
//   // console.log(pokemon);
// }

function createPokemonCard(pokemonObj) {
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
    
      <a href="pokemon.html" class="card__a">
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

async function getSinglePokemon(pokemonList) {
  for (pokemon of pokemonList) {
    const pokemonObj = await fetchAPI(pokemon.url);

    // const pokemon = await getSinglePokemonData(result.url);
    // console.log(pokemonObj);
    createPokemonCard(pokemonObj);
  }
}

async function getPokemonList() {
  const { results } = await fetchAPI('https://pokeapi.co/api/v2/pokemon');

  // console.log(results);

  getSinglePokemon(results);
}

function init() {
  // Router to run functions on different pages
  switch (global.currentPage) {
    case '/index.html':
      getPokemonList();
      break;
    case '/pokemon.html':
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
