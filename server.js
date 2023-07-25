const app = require('./app');
const ConnectToDatabase = require('./Frameworks/mongoose/connector/db');

ConnectToDatabase().then(() => {
  app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('listen on 5000');
  });
});
