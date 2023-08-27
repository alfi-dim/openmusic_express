const { connect } = require('mongoose');

const ConnectToDatabase = async () => {
  await connect(`${process.env.MONGODBHOST}/${process.env.MONGODBNAME}`);
};
// eslint-disable-next-line no-console
ConnectToDatabase().catch((err) => console.log(err));

module.exports = ConnectToDatabase;
