require('dotenv').config();
const app = require('./app');
const ConnectToDatabase = require('./Frameworks/mongoose/connector/db');
const ValidationRegistrar = require('./Middleware/ValidationRegistrar');

ConnectToDatabase().then(() => {
  ValidationRegistrar.registerRule();
  app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('listen on 5000');
  });
});
