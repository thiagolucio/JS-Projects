/*
  Fetch é uma Promisse especializada na busca usado pra buscar URL no JS
*/

// Primeiro exemplo de fetch
// fetch('pagina2.html').then(resposta => { // se pedir uma página que não existe ele retorna o .catch com o erro
//   if(resposta.status !==200) throw new Error('ERRO 404!'); // tratando o erro caso ocorra.... (pode ser outros códigos)
//   return resposta.text();
// })
// .then(html => console.log(html)) // Ele retorna no console log a pagina e o conteúdo dela (.text())
// .catch(e => console.error(e));

// Segundo exemplo de Fetch
// function carregaPagina(el) {
//   const href = el.getAttribute('href');

//   fetch(href)
//   .then(response => response.text()) // tá pegando a resposta e convertendo a resposta em texto
//   .then(html => carregaResultado(html)) // pegando esse cara e carregando ele como html usando a funcao "carregaResultado"
//   .catch(e => console.error(e));
// }



// Terceiro exemplo de Fetch
// function carregaPagina(el) {
//   const href = el.getAttribute('href');

//   fetch(href)
//   .then(response => { // tá pegando a resposta e convertendo a resposta em texto
//     if(response.status !== 200) throw new Error('ERRO 404!');
//     response.text();
//   })
//   .then(html => carregaResultado(html)) // pegando esse cara e carregando ele como html usando a funcao "carregaResultado"
//   .catch(e => console.error(e));
// }


// Quarto exemplo de Fetch// function carregaPagina(el) {
// async function carregaPagina(el) {
//   const href = el.getAttribute('href');
//   const response = await fetch(href);

//   if(response.status !== 200) throw new Error('ERRO 404!');

//   const html = await response.text();
//   carregaResultado(html);
// }


// Quinto exemplo de fetch

document.addEventListener('click', e => {
  const el = e.target;
  const tag = el.tagName.toLowerCase();

  if (tag === 'a') {
    e.preventDefault();
    carregaPagina(el);
  }
});

async function carregaPagina(el) {
  try {
    const href = el.getAttribute('href');
    const response = await fetch(href); // retorna uma promisse

    if(response.status !== 200) throw new Error('ERRO 404!');

    const html = await response.text();
    carregaResultado(html);
  } catch(e) {
    console.log(e);
  }
}

function carregaResultado(response) {
  const resultado = document.querySelector('.resultado');
  resultado.innerHTML = response;
}










