const User = require('../models/UserModel');

exports.index = async(req, res) => {
  const users = await User.findUsers(); // you will receive the result of the promise in "UserModel, on line 67" which will be a descending list by creation date
  res.render('index', { users }); // here it is injecting contacts into the "index/ home page". What will be the descending list received above
};