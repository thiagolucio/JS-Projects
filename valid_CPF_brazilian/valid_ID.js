// CPF 1: 705.484.450-52 
// CPF 2: 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/

// Um jeito bem simples e "moderno" de fazer o calculo do primeiro digito
// let cpf =  '705.484.450-52';
// let cpfLimpo = cpf.replace(/\D+/g, '');
// cpfArray = Array.from(cpfLimpo);
// console.log(cpfArray.reduce((ac, val) => ac + Number(val), 0));

// funcao que pega o cpf e limpa ele pra deixar só números
function ValidaCPF(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', { // cpfLimpo é o CPF sem os caracteres
    enumerable: true, // aqui valida ele como número indicando que enumerable é true.
    get: function() {
      return cpfEnviado.replace(/\D+/g, ''); // essa expressão regular representa "tudo que não for um número" vai ser substituido por nada. 
    }
  });
}
// funcao que valida se o cpf é válido
ValidaCPF.prototype.valida = function() {
  if(typeof this.cpfLimpo === 'undefined') return false; // se o CPF não for enviado retorna falso. Ele precisa do this porque vem de dentro de outra função com retorno 
  if(this.cpfLimpo.length !== 11) return false; // se o cpf for números mas menor que 11 casas decimais então é falso
  if(this.isSequencia()) return false; // se o cpf for uma sequência de números então retorna falso (tratado funcao linha 72 )

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);
  // console.log('digitos: ', digito1, digito2);

  const novoCpf = cpfParcial + digito1 + digito2; // Aqui ele concatena os 9 numeros do cpf com os dois digitos gerados. Sendo que são todos strings agora pois foram convertidos lá em baixo na linha 69
  // console.log('novoCpf', novoCpf);
  return novoCpf === this.cpfLimpo; // retorna o CPF limpo sem os caracteres
};


// Funcao que faz o calculo dos digitos
ValidaCPF.prototype.criaDigito = function(cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  // console.log('cpfArray', cpfArray);
  
  let regressivo = cpfArray.length + 1; // aqui ele está declarando regressivo como variável que recebe o tamanho do array + 1 (retorna 10)
  // console.log('regressivo', regressivo); // retorna 10 - Então regressivo começa com 10
  const total = cpfArray.reduce((ac, val) => {
    ac += (regressivo * Number(val)); // aqui ac  recebe soma do valor de regressivo vezes o número da posição que está sendo corrido no array
    regressivo--; // aqui vai descendo as posições do array (10, 9 , 8 , 7, 6, 5, 4, 3, 2, 1)
    // console.log('regressivo', regressivo);
    // console.log('ac', ac);
    return ac; // 237 primeiro e depois 284
  }, 0);
  // console.log('total', total); // retorna 237 e depois 284
  const digito = 11 - (total % 11); // faz o calculo para obter os dois últimos digitos. Primeiro um depois do outro 
  // console.log('digito', digito); // retorna 237  
  // console.log('return -> ', digito > 9 ? '0' : String(digito)); // retorna os digitos a cada loop
  return digito > 9 ? '0' : String(digito); // aqui ele trata os números do CPF transformando em Strings. 
};

ValidaCPF.prototype.isSequencia = function() {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length); // pegando o primeiro numero do cpf e se ele for igual a todos os outros é uma sequencia (que não pode)
  return sequencia === this.cpfLimpo; // ele retorna que sim, é uma sequencia e isso vai acionar o isSequencia retornar false lá na linha 38 na funcao de validacao
};

// A variável do CPF recebe o mesmo
const cpf = new ValidaCPF('705.484.450-52');
// console.log("CPF Limpo - ", cpf.cpfLimpo); // Recebe o CPF limpo

if(cpf.valida()) {
  console.log('Cpf válido');
} else {
  console.log('Cpf inválido');
}
