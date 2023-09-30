import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init(); // cria um método chamado init pra inicciar e não ficar reclamando que foi criada mas nao usado
cadastro.init(); // cria um método chamado init pra inicciar e não ficar reclamando que foi criada mas nao usado

// import './assets/css/style.css';

