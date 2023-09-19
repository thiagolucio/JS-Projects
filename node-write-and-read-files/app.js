const path = require('path');
const caminhoArquivo = path.resolve(__dirname, 'teste.json');
// const caminhoArquivo = path.resolve(__dirname, '..', 'teste.json'); // vc também poderia indicar o caminho declarando direto aqui depois de __dirname
const escreve = require('./modules/escrever'); // vai retornar uma promisse porque usa o fs promises no arquivo escreve.js
const ler = require('./modules/ler'); // vai retornar uma promisse porque usa o fs promises no arquivo ler.js

const pessoas = [
  { name: 'João' },
  { name: 'Maria' },
  { name: 'Thiago' },
  { name: 'Luiza' },
];
const json = JSON.stringify(pessoas, ' ', 2);
console.log('console no json', json);
escreve(caminhoArquivo, json); // promisse retornada

async function leArquivo(caminho) { // quando usa o async vc está retornando uma promessa e por isso vc precisará tratar ao receber ela
  const dados = await ler(caminho);
  renderizaDados(dados);
}

// Abaixo ele vai usar um then pra tratar os dados
// const dadosArquivo = lerArquivo(caminhoArquivo)
// .then(dados => console.log(dados));

// Abaixo ele vai usar essa funcao para tratar o retorno da promisses acima "leArquivo" que é outra possibilidade
function renderizaDados(dados) {
  dados = JSON.parse(dados); // parseando os dados pra ele voltar a ser um objeto
  dados.forEach(val => console.log(val.name)); // vai retornar os nomes do objeto percorrendo com o forEach
}
leArquivo(caminhoArquivo);

// Toda funcao asíncrona retorna uma promessa e deve ser tratada quando recebida. Funcoes Async/ Await são promessas
// para tratar vc pode usar principalmente "then" ou usar uma outra funcao pra tratar o retorno da promisses