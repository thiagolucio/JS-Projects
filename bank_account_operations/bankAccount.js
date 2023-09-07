// Superclass
// Fazer um método se comportar de forma diferente em classes filhas de um mesmo Pai é chamado de polimorfismo
function Conta(agencia, conta, saldo) {
  this.agencia = agencia;
  this.conta = conta;
  this.saldo = saldo;
}

// Funcao de saque
// verifica se o valor do saque é maior que o saldo. Se for exibe uma mensagem de Saldo insuficiente.
// se não for maior que o saldo, subtrai o valor do saque do saldo
// executa a funcao verSaldo()
Conta.prototype.sacar = function(valor) {
  if(valor > this.saldo) {
    console.log(`Saldo insuficiente: ${this.saldo}`);
    return;
  }
  this.saldo -= valor;
  this.verSaldo();
};
// Funcao de deposito
// Ela pega o valor informado e o adiciona ao saldo e chama a funcao verSaldo
Conta.prototype.depositar = function(valor) {
  this.saldo += valor;
  this.verSaldo();
};

// Função para ver o saldo. É chamada na Super Class Conta, linha 19
// recebe o saldo atualizado e exibe na tela a agencia, conta e o saldo atualizado convertido em moeda
Conta.prototype.verSaldo = function() {
  console.log(
    `Ag/c: ${this.agencia}/${this.conta} | ` +
    `Saldo: R$${this.saldo.toFixed(2)}`
  );
};

// Função Classe de conta corrente
// Esta funcao permite um limite de 100 na conta corrente. O que significa que a conta pode ficar 100 negativos
function ContaCorrente(agencia, conta, saldo, limite) { // ele declara os argumentos da Superclasse e adiciona o limite nesta subclasse ContaCorrente
  Conta.call(this, agencia, conta, saldo); // cria a herança pra herdar da Mae dele "Conta" com o método ".call". Esse é o formato com o "this" na frente
  this.limite = limite; // declara limite para essa classe
  console.log('Limite Conta Corrente: ', this.limite);
}
ContaCorrente.prototype = Object.create(Conta.prototype); // Cria funcao ContaCorrente como prototipo de Conta
ContaCorrente.prototype.constructor = ContaCorrente; // Converte para uma funcao Construtora


// / Cria a funcao sacar da ContaCorrente
ContaCorrente.prototype.sacar = function(valor) {
  if(valor > (this.saldo + this.limite)) { // se o valor for maior que a soma do saldo mais o limite de 100 ...
    console.log(`Saldo insuficiente: ${this.saldo}`); // ... entao informa com a mensagem do saldo insuficiente mostrando o saldo
    return;
  }

  this.saldo -= valor;
  this.verSaldo(); // reutiliza a funcao verSaldo() pois é um calculo com os mesmos valores e propriedades trazidas
};

// cria a funcao ContaPoupanca
function ContaPoupanca(agencia, conta, saldo) {
  Conta.call(this, agencia, conta, saldo);
}
ContaPoupanca.prototype = Object.create(Conta.prototype); // Cria funcao ContaPoupanca como prototipo de Conta
ContaPoupanca.prototype.constructor = ContaPoupanca; // Converte para uma funcao Construtora

const cc = new ContaCorrente(11, 22, 0, 90); // cria uma constante que recebe a ContaCorrente com valores agencia, conta, saldo, limite
cc.depositar(10);
cc.sacar(110);
cc.sacar(1);

console.log();

const cp = new ContaPoupanca(12, 33, 0);
cp.depositar(100);
cp.sacar(10);
cp.sacar(5);


// console.log();

