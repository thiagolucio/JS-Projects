const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const userController = require('./src/controllers/userController');

const { loginRequired } = require('./src/middlewares/middleware');

// Home paths
route.get('/', homeController.index);

// Login paths
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// User paths
route.get('/user/index', loginRequired, userController.index);
route.post('/user/register', loginRequired, userController.register);
route.get('/user/index/:id', loginRequired, userController.editIndex);
route.post('/user/edit/:id', loginRequired, userController.edit);
route.get('/user/delete/:id', loginRequired, userController.delete);

module.exports = route;
