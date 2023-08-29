// FUNCAO CONSTRUTORA
function Calculadora() {
  this.display = document.querySelector('.display');

  this.inicia = () => { // primeiro método do objeto
    this.capturaCliques();
    this.capturaEnter();
    this.display.focus();
  }; 

  // capturando o enter pra poder realizar a conta
  this.capturaEnter = () => {
    document.addEventListener('keyup', e => { // quando a tecla é solta depois de ser pressionada
      if (e.key === 'Enter') { //keycode está deprecado sendo substituído por este 
        this.realizaConta();
      }
    });
  };

  // capturando o esc pra poder limpar o display
  this.capturaEsc = () => {
    document.addEventListener('keyup', e => {
      if (e.key === 'Escape') this.display.clear();
    });
  }

  this.capturaCliques = () => { // primeira função a ser executada no objeto. Fica ouvindo o clique
    document.addEventListener('click', event => {
      const el = event.target; // captura o local clicado
      if (el.classList.contains('btn-num')) this.addNumDisplay(el); // captura o valor digitado
      if (el.classList.contains('btn-clear')) this.clear(); // limpa o display
      if (el.classList.contains('btn-del')) this.del();  // apaga o ultimo valor digitado (backspace)
      if (el.classList.contains('btn-eq')) this.realizaConta(); // digitou o enter e mandou dar o resultado no display
    });
  };

  this.realizaConta = () => {
    try {
      const conta = eval(this.display.value); // fará o calculo e retornará o valor
      /* 
        esse eval é perigoso mas neste caso pode ser usado. 
        Isso porque ele deduz o que deve fazer e pode deduzir errado dependendo de 
        como estiver usando ele.
      */
      console.log('conta', conta);

      if(!conta) { // negando caso não seja possível solucionar o calculo (provavelmente digitou algo errado)
        alert('Conta inválida');
        return;
      }

      this.display.value = conta; // retorno final do calculo é mostrado no display
    } catch(e) {
      alert('Conta inválida'); // caso de erro (o erro capturado deve ser tratado separadamente sem que o usuário consiga ver)
      return;
    }
  };

  this.addNumDisplay = el => {
    this.display.value += el.innerText; // captura o valor digitado e vai efetuando a operação selecionada para o novo valor digitado
    this.display.focus(); // remove o focus do input pra não registrar o mesmo número quando digitar o ENTER
  };

  this.clear = () => this.display.value = '';
  this.del = () => this.display.value = this.display.value.slice(0, -1);
}

const calculadora = new Calculadora(); // Cria um novo Objeto usando uma nova instância de Calculadora
calculadora.inicia(); // Chama o método "inicia" lá dentro da Calculadora que inicia todo o processo da Construtora. 
