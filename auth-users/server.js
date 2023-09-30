const path = require('path'); // path manager between O.S paths (windows, mac, linux)
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('Ready');
  })
  .catch(e => console.log('OPS. Some Error Bump -> ', e));


  const session = require('express-session'); // client cookie manager
  const MongoStore = require('connect-mongo'); // save session in BD
  const flash = require('connect-flash'); // msg manager.  Fast messages (not saved in user session)
  const routes = require('./routes');
  const csrf = require('csurf'); // Token manager generator
  const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


    app.use(express.urlencoded({ extended: true })); // forms post inside app
    app.use(express.json()); // json parses manager
    app.use(express.static(path.resolve(__dirname, 'public'))); // static dir path

// Create session options definitions - http://expressjs.com/en/resources/middleware/session.html
    const sessionOptions = session({
      secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()', // secret key you want to create
      store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), // save session in BD
      resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request. Just use in conjunction with touch method session
      saveUninitialized: false, // Forces a session that is “uninitialized” to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. 
      cookie: {
        // maxAge: 1000 * 60 * 60 * 24 * 7, // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute. This is done by taking the current server time and adding maxAge milliseconds to the value to calculate an Expires datetime. By default, no maximum age is set.
        maxAge: 10000, // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute. This is done by taking the current server time and adding maxAge milliseconds to the value to calculate an Expires datetime. By default, no maximum age is set.
        httpOnly: true // Specifies the Boolean value of the HttpOnly Set-Cookie attribute. When true, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is set.
      }
    });
    app.use(sessionOptions); // use the created session options
    app.use(flash()); // use flash messages
    
    app.set('views', path.resolve(__dirname, 'src', 'views')); // view files path
    app.set('view engine', 'ejs'); // use EJS
    
    app.use(csrf()); // create a token for security
    // middlewares
    app.use(middlewareGlobal);
    app.use(checkCsrfError);
    app.use(csrfMiddleware);
    app.use(routes);

// "Ready" condition ok so execute
app.on('Ready', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});