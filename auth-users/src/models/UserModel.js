const mongoose = require('mongoose');
const validator = require('validator');

// create user mongoose schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createIn: { type: Date, default: Date.now },
});

// UserModel received the schema
const UserModel = mongoose.model('User', UserSchema);

function User(body) {
  this.body = body;
  this.errors = [];
  this.user = null;
}

User.prototype.register = async function() {
  this.validitionData();
  if(this.errors.length > 0) return;
  this.user = await UserModel.create(this.body);
  // return this.user;
};

// Validate User 
User.prototype.validitionData = function() {
  this.cleanUp(); // call cleanup function to remove empty spaces
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); // if empty or wrong email return the error
  if(!this.body.name) this.errors.push('Nome é um campo obrigatório.'); // if empty or wrong name return the error
  if(!this.body.email && !this.body.pphone) { // if empty or wrong email and phone return the error
    this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
  }
}

// Remove all empty spaces in all text from body
User.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.name,
    sobrenome: this.body.surname,
    email: this.body.email,
    telefone: this.body.phone,
  };
};


User.prototype.edit = async function(id) {
  if(typeof id !== 'string') return; // not same id return error
  this.validator();
  if(this.errors.length > 0) return; // return any one error  
  this.user = await UserModel.findByIdAndUpdate(id, this.body, { new: true });  // find user by id and update all infos about this user using findByIdAndUpdate
};


// Static methods
User.searchById = async function(id) {
    if(typeof id !== 'string') return; // if different to string return id
    const user = await UserModel.findById(id); // search for the id in the database it's the same id received
    return user; // return user
  };
  
  User.findUsers = async function() {
    const users = await UserModel.find()
      .sort({ createIn: -1 }); // so that the contacts shown are sorted in descending order in which they were created. That's it. From most recent to least recent. Descending order. Hence the "-1". "-1 = decreasing/ 1 = increasing"
    return users;
  };
  
  User.delete = async function(id) { // the function receives the id deleted from ContatoController (line 68)
    if(typeof id !== 'string') return; // checks if the id is different from a string and return
    const user = await UserModel.findOneAndDelete({_id: id}); // contact receives the user searched for by ID and deleted... You must indicate the object with id filter to be able to delete exactly the desired id
    return user; // returning contact at the end
  };
  
  module.exports = User;