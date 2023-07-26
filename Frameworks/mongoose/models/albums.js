const { Schema, model } = require('mongoose');
const { nanoid } = require('nanoid');

const albumSchema = new Schema({
  _id: {
    type: String,
    default: `albums-${nanoid(16)}`,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 3000,
  },
  cover: {
    type: String,
  },
});

const AlbumModel = model('albums', albumSchema);

module.exports = AlbumModel;
