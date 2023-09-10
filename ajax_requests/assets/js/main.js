// Requisicoes assíncronas
// AJAX é simplesmente um tipo de chamada ou requisição XHTMLHttpRequest
/*

TRATANDO RESPOSTAS HTTP:

Os códigos de status de resposta HTTP indicam se uma solicitação HTTP específica foi concluída com êxito. As respostas são agrupadas em cinco classes:

Respostas Informativas (100 – 199) - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_informativas
Respostas bem-sucedidas (200 – 299) - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_bem-sucedidas
Mensagens de redirecionamento (300 – 399) - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#mensagens_de_redirecionamento
Respostas de erro do cliente (400 – 499) - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_de_erro_do_cliente
Respostas de erro do servidor (500 – 599) - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_de_erro_do_servidor

*/

const request = obj => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url, true); // métodos podem ser (get, post, put, delete) e url é a BASE_URL da aplicação
    xhr.send();
    console.log('XHR >', xhr);
    console.log('XHR:: SEND >', xhr.send());

    xhr.addEventListener('load', () => { 
      if(xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText); // retorno se resolver
      } else {
        reject(xhr.statusText); // retorno se rejeitar
      }
    });
  });
};

document.addEventListener('click', e => {
  const el = e.target; // captura o link da página que foi clicado (target)
  console.log('EL :> ', el);
  const tag = el.tagName.toLowerCase(); // tagName retorna o nome do elemento e depois converte pra minúsculo

  if (tag === 'a') {
    e.preventDefault();
    carregaPagina(el); // Promisse
    console.log('carregaPagina(el) :> ', carregaPagina(el));
  }
});

async function carregaPagina(el) {
  const href = el.getAttribute('href');

  const objConfig = {
    method: 'GET', // pegando o metodo (obj.method)
    url: href // pegando o URL do (obj.url)
  };

  try {
    const response = await request(objConfig); // await espera a resposta da requisição (method, url)
    carregaResultado(response);
    console.log('CARREGA RESULTADO : > ', carregaResultado(response));
  } catch(e) {
    console.log(e);
  }
}

function carregaResultado(response) { // pegando da linha 53 ali o response
  const resultado = document.querySelector('.resultado'); // trás conteúdo do link (página requisitada no evento de clique)
  console.log('RESULTADO -> ', resultado);
  resultado.innerHTML = response;
  console.log('Response da página', response);
}