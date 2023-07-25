const { Schema } = require('mongoose');

const { nanoid } = require('nanoid');

const Songs = new Schema({
  _id: {
    type: String,
    default: `songs-${nanoid(16)}`,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 3000,
  },
  performer: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  album_id: {
    type: String,
  },
});

module.exports = Songs;
