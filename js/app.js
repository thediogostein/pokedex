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
  const domElements = {
    img: document.getElementById('pokemon-img'),
    name: document.getElementById('pokemon-name'),
    types: document.getElementById('types'),
    id: document.getElementById('pokemon-id'),
    height: document.getElementById('pokemon-height'),
    weight: document.getElementById('pokemon-weight'),
    stats: {
      hp: document.getElementById('hp'),
      attack: document.getElementById('attack'),
      defense: document.getElementById('defense'),
      spAttack: document.getElementById('sp-attack'),
      spDefense: document.getElementById('sp-defense'),
      speed: document.getElementById('speed'),
    },
  };
  global.spinnerEl.classList.add('show');

  const pokemonId = window.location.search.split('=')[1];
  const pokemon = await fetchAPI(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );

  const pokemonHtml = console.log(pokemon);
  // img
  domElements.img.src = pokemon.sprites.other['official-artwork'].front_default;
  domElements.img.alt = pokemon.name;
  domElements.img.classList.add(pokemon.types[0].type.name);

  // id & name
  domElements.id.append(document.createTextNode(pokemon.id));
  domElements.name.append(
    document.createTextNode(
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    )
  );

  pokemon.types.map((type) => {
    const span = document.createElement('span');
    span.append(document.createTextNode(type.type.name));
    span.classList.add('card__badge', `badge-${type.type.name}`);
    domElements.types.append(span);
  });
  // console.log(pokemon.types);

  // height & weight
  domElements.height.append(
    document.createTextNode(`${pokemon.height / 10} m`)
  );
  domElements.weight.append(
    document.createTextNode(`${(pokemon.weight / 2.205).toFixed(2)} kg`)
  );

  // chart

  document.querySelectorAll('.stats').forEach((item) => {
    item.classList.add(`badge-${pokemon.types[0].type.name}`);
  });

  domElements.stats.hp.style.width = `${
    (pokemon.stats[0].base_stat * 100) / 255
  }%`;
  domElements.stats.hp.append(
    document.createTextNode(pokemon.stats[0].base_stat)
  );

  domElements.stats.attack.style.width = `${
    (pokemon.stats[1].base_stat * 100) / 255
  }%`;
  domElements.stats.attack.append(
    document.createTextNode(pokemon.stats[1].base_stat)
  );

  domElements.stats.defense.style.width = `${
    (pokemon.stats[2].base_stat * 200) / 255
  }%`;
  domElements.stats.defense.append(
    document.createTextNode(pokemon.stats[2].base_stat)
  );

  domElements.stats.spAttack.style.width = `${
    (pokemon.stats[3].base_stat * 200) / 255
  }%`;
  domElements.stats.spAttack.append(
    document.createTextNode(pokemon.stats[3].base_stat)
  );

  domElements.stats.spDefense.style.width = `${
    (pokemon.stats[4].base_stat * 200) / 255
  }%`;
  domElements.stats.spDefense.append(
    document.createTextNode(pokemon.stats[4].base_stat)
  );

  domElements.stats.speed.style.width = `${
    (pokemon.stats[5].base_stat * 200) / 255
  }%`;
  domElements.stats.speed.append(
    document.createTextNode(pokemon.stats[5].base_stat)
  );

  global.spinnerEl.classList.remove('show');
}

function addPokemonToDOM(pokemon) {
  // console.log(pokemon);

  const li = document.createElement('li');
  li.classList.add('card__li');
  document.querySelector('#cards-container').append(li);

  const a = document.createElement('a');
  a.classList.add('card__a');
  a.href = `pokemon.html?id=${pokemon.id}`;
  li.append(a);
  const article = document.createElement('article');
  article.classList.add('card__article');
  a.append(article);
  const img = document.createElement('img');
  img.classList.add('card__img');
  img.src = pokemon.img;
  img.alt = pokemon.name;

  switch (pokemon.types[0].type.name) {
    case 'normal':
      img.classList.add('normal');
      break;
    case 'fighting':
      img.classList.add('fighting');
      break;
    case 'flying':
      img.classList.add('flying');
      break;
    case 'poison':
      img.classList.add('poison');
      break;
    case 'ground':
      img.classList.add('ground');
      break;
    case 'rock':
      img.classList.add('rock');
      break;
    case 'bug':
      img.classList.add('bug');
      break;
    case 'ghost':
      img.classList.add('ghost');
      break;
    case 'steel':
      img.classList.add('steel');
      break;
    case 'fire':
      img.classList.add('fire');
      break;
    case 'water':
      img.classList.add('water');
      break;
    case 'grass':
      img.classList.add('grass');
      break;
    case 'electric':
      img.classList.add('electric');
      break;
    case 'psychic':
      img.classList.add('psychic');
      break;
    case 'ice':
      img.classList.add('ice');
      break;
    case 'dragon':
      img.classList.add('dragon');
      break;
    case 'dark':
      img.classList.add('dark');
      break;
    case 'fairy':
      img.classList.add('fairy');
      break;
    default:
      img.classList.add('normal');
  }

  article.append(img);

  const header = document.createElement('header');
  header.classList.add('card__header');
  article.append(header);
  const cardLeft = document.createElement('div');
  cardLeft.classList.add('card__left');
  header.append(cardLeft);
  const id = document.createElement('span');
  id.classList.add('card__number');
  id.append(document.createTextNode(`#${pokemon.id}`));
  const name = document.createElement('h2');
  name.classList.add('card__title');
  name.append(document.createTextNode(pokemon.name));
  cardLeft.append(id, name);

  const cardRight = document.createElement('div');
  cardRight.classList.add('card__right');
  cardRight.innerHTML = pokemon.types
    .map(
      (type) =>
        `<span class='card__badge badge-${type.type.name}'>${type.type.name}</span>`
    )
    .join('');

  header.append(cardRight);
}

function createPokemonObj(pokemonsArray) {
  const cardsContainer = document.querySelector('#cards-container');

  const pokemon = {};

  pokemonsArray.forEach((pokemon) => {
    // console.log(pokemon);
    pokemon = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types,
    };

    addPokemonToDOM(pokemon);
  });
}

// || --
async function fetchPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');

    const { results } = await response.json();

    global.spinnerEl.classList.add('show');

    const responseList = await Promise.allSettled(
      results.map((pokemon) => fetch(pokemon.url))
    );
    const responseListFulfilled = responseList.filter((item) => {
      if (item.status === 'fulfilled') return item;
    });
    const resultsFulfilled = responseListFulfilled.map((item) => item.value);
    const data = await Promise.all(resultsFulfilled.map((item) => item.json()));

    // console.log(data);

    createPokemonObj(data);
    global.spinnerEl.classList.remove('show');
  } catch (error) {
    //
  }
}

async function fetchPokemon(pokemon) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!res.ok) throw new Error(`Pokemon not found`);
    global.spinnerEl.classList.add('show');

    const data = await res.json();

    pokemon = {
      id: data.id,
      name: data.name,
      img: data.sprites.other['official-artwork'].front_default,
      types: data.types,
    };

    addPokemonToDOM(pokemon);
    global.spinnerEl.classList.remove('show');
  } catch (error) {
    document
      .querySelector('#cards-container')
      .append(document.createTextNode('Pokemon not found'));
  }
}

function searchPokemon() {
  const form = document.querySelector('#search-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    cleanDOM();

    const searchInput = form.querySelector('#search-bar').value;

    console.log(searchInput);

    fetchPokemon(searchInput);
    form.reset();
  });
}

function cleanDOM() {
  document.getElementById('cards-container').innerHTML = '';
}

async function fetchByType(type) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/type/${type}?limit=10&offset=0`
    );

    if (!res.ok) throw new Error('Error');

    const { pokemon: results } = await res.json();

    global.spinnerEl.classList.add('show');

    const responseList = await Promise.allSettled(
      results.map((item) => fetch(item.pokemon.url))
    );

    const responseListFulfilled = responseList.filter((item) => {
      if (item.status === 'fulfilled') return item;
    });
    const resultsFulfilled = responseListFulfilled.map((item) => item.value);

    const data = await Promise.all(resultsFulfilled.map((item) => item.json()));

    document.getElementById('total').textContent = '';
    document
      .getElementById('total')
      .append(document.createTextNode(`${data.length} pokémons`));

    createPokemonObj(data);
    global.spinnerEl.classList.remove('show');
  } catch (error) {
    console.log(error);
  }
}

function displayByType() {
  const form = document.querySelector('#types-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = form.querySelector('#types-dropdown').value;

    cleanDOM();

    if (type === 'all') {
      fetchPokemons();
    } else {
      fetchByType(type);
    }
  });
}

function init() {
  // Router to run functions on different pages
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      fetchPokemons();
      searchPokemon();
      displayByType();
      break;
    case '/pokemon.html':
      displayPokemonDetails();
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
