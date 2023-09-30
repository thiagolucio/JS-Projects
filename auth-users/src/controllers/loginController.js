const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  console.log('Dados da Sessão', req.session.user);
  if(req.session.user) return res.render('login-logado'); 
  return res.render('login');
};

exports.register = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.register(); // the register function runs user tests before logging in (data validation, checks if there is already a user with the same email, etc.)

    if(login.errors.length > 0) {
      req.flash('errors', login.errors); // flash message show errors
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso.');
    req.session.save(function() {
      return res.redirect('back');
    });
  } catch(e) {
    console.log('Erro ao salvar o usuário - ', e);
    return res.render('404');
  }
};

exports.login = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema.');
    req.session.user = login.user; // if user session it's same at logged user
    req.session.save(function() {
      return res.redirect('back');
    });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

