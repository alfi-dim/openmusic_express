const { connect } = require('mongoose');

const ConnectToDatabase = async () => {
  await connect('mongodb://127.0.0.1:27017/openmusic');
};
// eslint-disable-next-line no-console
ConnectToDatabase().catch((err) => console.log(err));

module.exports = ConnectToDatabase;
