const User = require('../models/UserModel');

exports.index = async(req, res) => {
    res.render('user', {
        user: {}
    })
};

exports.register = async(req, res) => {
    try {
      const user = new User(req.body);
      await user.register();
  
      if(user.errors.length > 0) {
        req.flash('errors', user.errors);
        req.session.save(() => res.redirect('back'));
        return;
      }
  
      req.flash('success', 'Usuário registrado com sucesso.');
      req.session.save(() => res.redirect(`/user/index/${user.user._id}`));
      return;
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };

  exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404'); // se o parametro "ID" do usuário não for enviado ele já retorna o erro 404
  
    const user = await User.findById(req.params.id);
    if(!user) return res.render('404');
  
    res.render('user', { user });
  };

  // editar o contato quando já existente
exports.edit = async function(req, res) {
    try {
      if(!req.params.id) return res.render('404');
      const user = new User(req.body); // create new User instance
      await user.edit(req.params.id); // edit the user with the id received
  
      if(user.errors.length > 0) {
        req.flash('errors', user.errors); // return flash message of errors
        req.session.save(() => res.redirect('back')); // save session before redirect
        return;
      }
  
      req.flash('success', 'user editado com sucesso.'); // if all goes well return flash success message
      req.session.save(() => res.redirect(`/user/index/${user.user._id}`)); // save session before redirect
      return;
    } catch(e) {
      console.log('Ops, we find a bug bump!', e);
      res.render('404');
    }
  };

  exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404'); // if the id is not found return 404
  
    const user = await User.delete(req.params.id); // go run all database users based on the id and delete this user register
    if(!user) return res.render('404'); // if the user cannot be found res.render 404
  
    req.flash('success', 'User removed Done!'); //if all good return flash message
    req.session.save(() => res.redirect('back')); // save session before redirect
    return;
  };