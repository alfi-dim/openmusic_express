const { Schema, model } = require('mongoose');

const AuthenticationsSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const AuthenticationsModel = model('authentications', AuthenticationsSchema);
module.exports = AuthenticationsModel;
