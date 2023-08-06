const { Schema, model } = require('mongoose');
const { nanoid } = require('nanoid');

const playlistSchema = new Schema({
  _id: {
    type: String,
    default: `playlists-${nanoid(16)}`,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    ref: 'users',
    validate: {
      async validator(value) {
        if (value) {
          const UserModel = model('users');
          return UserModel.exists({ _id: value });
        }
        return true; // Allow null or undefined values for the author field
      },
      message: 'Referenced author does not exist.',
    },
  },
  songs: [
    {
      type: String,
      ref: 'songs',
      validate: {
        async validator(value) {
          if (value) {
            const SongModel = model('songs');
            return SongModel.exists({ _id: value });
          }
          return true; // Allow null or undefined values for the author field
        },
        message: 'Referenced song does not exist.',
      },
    },
  ],
});

const PlaylistModel = model('playlists', playlistSchema);
module.exports = PlaylistModel;
