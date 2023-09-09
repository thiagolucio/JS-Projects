class checkForm {
  constructor() { // A funcao construtora é construida aqui para que declarar os métodos que vc poderá usar em outras classes a partir desta / The constructor function it's build to declare the methods you can use in other classes.
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => { // Funcao de callback chamada por um evento enviar. A funcao arrow nao permite a alteração do this
      this.handleSubmit(e); 
    });
  }

  handleSubmit(e) {
    e.preventDefault(); // usado para não executar o evento padrao e poder continuar a tratar as validações e regras controlando a hora de enviar o formulário
    const validFields = this.validCheckFields();
    const validPassWords = this.validCheckPassWords();

    if(validFields && validPassWords) { // se todas as regras forem atendidas ele enviar o formulário
      alert('Formulário enviado.');
      this.form.submit();
    }
  }

  validCheckPassWords() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const repeatPassWord = this.form.querySelector('.repeatPassword');

    if(password.value !== repeatPassWord.value) {
      valid = false;
      this.checkError(password, 'Campos senha e repetir senha precisar ser iguais.');
      this.checkError(repeatPassWord, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.checkError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }

  validCheckFields() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.check')) {
      const label = field.previousElementSibling.innerText; // Pega o text do label do field anterior ao atual. previousElementSibling = Elemento irmão anterior.

      if(!field.value) {
        this.checkError(field, `field "${label}" não pode estar em branco.`);
        valid = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.checkCPF(field)) valid = false;
      }

      if(field.classList.contains('user')) {
        if(!this.checkUser(field)) valid = false;
      }

    }

    return valid;
  }

  checkUser(field) {
    const user = field.value;
    let valid = true;

    if(user.length < 3 || user.length > 12) {
      this.checkError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)) { // regex = qq letra entre a e z minúsculo, qq letra entre A e Z maiúsculo, qq número entre 0 a 9 isso repetidas (sinal de +$ ) vezes
      this.checkError(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  checkCPF(field) {
    const cpf = new checkCPF(field.value);

    if(!cpf.valida()) {
      this.checkError(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  checkError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div); // Esse comando insere depois do próprio field a div error-text.
  }
}

const valida = new checkForm(); // cria um novo baseado no constructor do Original. Ele tipo clona a classe acima
