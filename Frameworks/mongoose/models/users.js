const { Schema, model } = require('mongoose');
const { nanoid } = require('nanoid');

const userSchema = new Schema({
  _id: {
    type: String,
    default: `users-${nanoid(16)}`,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model('users', userSchema);
module.exports = UserModel;
