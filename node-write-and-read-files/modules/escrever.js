const fs = require('fs').promises;

module.exports = (caminho, dados) => {
  fs.writeFile(caminho, dados, { flag: 'w', encoding: 'utf8' }); // flag "w" ele subscreve o arquivo
  // fs.writeFile(caminho, dados, { flag: 'a', encoding: 'utf8' }); // flag "a" ele adiciona mais textos no final do mesmo arquivo. Desta forma nao subscreve so adiciona o proximo texto
};
