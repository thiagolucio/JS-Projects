const User = require('../models/UserModel');

exports.index = async(req, res) => {
    res.render('user', {
        user: {}
    })
};

