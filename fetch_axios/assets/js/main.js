// USANDO AXIOS - Axios é uma lib de JS que faz requisicoes HTTP

// fetch simple usual
// fetch('pessoas.json')
//   .then(resposta => resposta.json())
//   .then(json => carregaElementosNaPagina(json));


// Mesmo Fetch Processo feito com o Axios
axios('pessoas.json')
  .then(resposta => carregaElementosNaPagina(resposta.data));

function carregaElementosNaPagina(json) {
  const table = document.createElement('table');

  for(let pessoa of json) {
    const tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.innerHTML = pessoa.nome; 
    tr.appendChild(td1);

    let td2 = document.createElement('td');
    td2.innerHTML = pessoa.idade;
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    td3.innerHTML = Intl.NumberFormat('pt-BR').format(pessoa.salario);
    tr.appendChild(td3);
    table.appendChild(tr);
  }

  const resultado = document.querySelector('.resultado');
  resultado.appendChild(table);
}
