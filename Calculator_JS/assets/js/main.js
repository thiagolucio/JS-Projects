 function criaCalculadora() {
  return {
    display: document.querySelector('.display'),

    // metodo de inicialização da calculadora
    inicia() {
      this.cliqueBotoes();
      this.pressionaBackSpace();
      this.pressionaEnter();
    },

    pressionaBackSpace() {
      this.display.addEventListener('keydown', e => {
        if (e.keyCode === 8) {
          e.preventDefault();
          this.clearDisplay();
        }
      });
    },

    pressionaEnter() {
      this.display.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
          this.realizaConta();
        }
      });
    },

    realizaConta() {
      let conta = this.display.value;

      try {
        conta = eval(conta);

        if(!conta) {
          alert('Conta inválida');
          return;
        }

        this.display.value = String(conta);
      } catch(e) {
        alert('Conta inválida');
        return;
      }
    },

    clearDisplay() {
      this.display.value = ''; // limpa o display
      // this.display.focus(); // mantém o cursor no display
    },

    apagaUm() {
      this.display.value = this.display.value.slice(0, -1); // tamanho da string menos 1 apaga só o último caractere
    },


    cliqueBotoes() {
      // Aqui o this é a calculadora
      console.log('This FORA do evento > ', this);
      // As Arrow Functions não mudam o comportamento do this
      document.addEventListener('click', e => {
        
        const el = e.target;

        console.log('This DENTRO do evento > ', this);

        if(el.classList.contains('btn-num')) {
          this.btnParaDisplay(el.innerText);
        }

        if(el.classList.contains('btn-clear')) {
          this.clearDisplay();
        }

        if(el.classList.contains('btn-del')) {
          this.apagaUm();
        }

        if(el.classList.contains('btn-eq')) {
          this.realizaConta();
        }

        this.display.focus();
      });
    },

    btnParaDisplay(valor) {
      this.display.value += valor;
    }

  };
}

const calculadora = criaCalculadora();
calculadora.inicia(); // chamando o método de inicializacao da calculadora
