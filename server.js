require('dotenv').config();
const app = require('./app');
const ConnectToDatabase = require('./Frameworks/mongoose/connector/db');
const ValidationRegistrar = require('./Middleware/ValidationRegistrar');

ConnectToDatabase().then(() => {
  const port = process.env.PORT;
  const host = process.env.HOST;

  ValidationRegistrar.registerRule();
  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`listen on ${host}:${port}`);
  });
});
