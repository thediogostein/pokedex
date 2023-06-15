// Criar um router para descobrir qual a página atual
// Rodar função na página certa
// Criar função fetchAPI que aceita receber um endpoint
// Criar uma função renderizar os cards
// Criar um função para renderizar o pokemon na pagina de detalhes

const global = {
  currentPage: window.location.pathname,
};

// Router to run functions on different pages
switch (global.currentPage) {
  case '/index.html':
    console.log('Index');
    break;
  case '/pokemon.html':
    console.log('Pokemon');
    break;
}
