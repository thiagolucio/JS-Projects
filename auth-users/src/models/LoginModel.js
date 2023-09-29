const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  // O processo de login
  async login() {
    this.validitionData(); // call validitionData()
    if(this.errors.length > 0) return; // return erros if exist
    this.user = await LoginModel.findOne({ email: this.body.email }); // find from users with same sent email
    
    // Bellow, if not find any user then return flash msg warning can't find this user
    if(!this.user) {
      this.errors.push('Usuário não existe.'); // For security reasons, it is better to inform in a more general way such as "invalid username or password"
      return;
    }
    /*
      Here it checks whether the password entered/sent is the same as the one saved by decrypting it to compare or using the same calculation
      Encrypted in the password you are sending to see if the two are the same when applying encryption.
    */
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  // Basic the same before(login) methods function
  async register() {
    this.validitionData();
    if(this.errors.length > 0) return;

    await this.userExists(); // then call this promise if this user already exists
    if(this.errors.length > 0) return; // if any error then return

    // Encrypt password using bcryptjs imported node package
    const salt = bcryptjs.genSaltSync(); // defines a jump to be applied when calculating the password hash (default = 10)
    this.body.password = bcryptjs.hashSync(this.body.password, salt); // the bcryptjs package calculates the password hash and the jump applied

    // He receives the promise at the right time and creates another user
    this.user = await LoginModel.create(this.body);
  }

  // Compares whether there is already a user with the same email address
  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email }); // look for a (findOne) user record with the same email (this.body.email) that is being sent
    if(this.user) this.errors.push('Usuário já existe.'); //  if user already exists then send this message like a error push
  }

  validitionData() {
    this.cleanUp(); // cleanUp all data have no empty spaces
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); // if email is not valid then send this message like a error push

    if(this.body.password.length < 3 || this.body.password.length > 50) { // check between 3 and 50 characters password
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.'); // if out of range bump error
    }
  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') { // remove empty spaces if different a String
        console.log(this.body[key]);
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;
