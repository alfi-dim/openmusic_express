const PlaylistsRepository = require('../../Interfaces/contracts/repositories/playlistsRepository');
const InvariantError = require('../../Exceptions/InvariantError');
const NotFoundError = require('../../Exceptions/NotFoundError');
const AuthorizationError = require('../../Exceptions/AuthorizationError');

class PlaylistsRepositoryMongoose extends PlaylistsRepository {
  constructor(playlistModel, formatModelUtils) {
    super();
    this.playlistModel = playlistModel;
    this.formatModelUtils = formatModelUtils;
  }

  async addNewPlaylist(playlist) {
    const { _id } = await this.playlistModel.create(playlist);
    if (!_id) {
      throw new InvariantError('Failed to create playlist');
    }
    return _id;
  }

  async addSongToPlaylist(playlistId, songId) {
    const updatedPlaylist = await this.playlistModel.updateOne(
      {
        _id: playlistId,
      },
      {
        $push: {
          songs: songId,
        },
      },
    );

    const { matchedCount, modifiedCount } = updatedPlaylist;
    if (!matchedCount) {
      throw new NotFoundError('Playlist not found');
    }
    if (!modifiedCount) {
      throw new InvariantError('Failed to insert song');
    }
  }

  async getPlaylistById(playlistId) {
    const playlist = await this.playlistModel.findOne({ _id: playlistId }).populate('songs');

    if (!playlist) {
      throw new NotFoundError('Playlist not found');
    }

    return this.formatModelUtils.formatModelPlaylist(playlist);
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const updatedPlaylist = await this.playlistModel.updateOne(
      {
        _id: playlistId,
      },
      {
        $pull: {
          songs: songId,
        },
      },
    );

    const { matchedCount, modifiedCount } = updatedPlaylist;
    if (!matchedCount) {
      throw new NotFoundError('Playlist not found');
    }
    if (!modifiedCount) {
      throw new InvariantError('Failed to delete song');
    }
  }

  async updatePlaylistById(playlistId, payload) {
    const updatedPlaylist = await this.playlistModel.updateOne(
      {
        _id: playlistId,
      },
      {
        ...payload,
      },
    );

    const { matchedCount, modifiedCount } = updatedPlaylist;
    if (!matchedCount) {
      throw new NotFoundError('Playlist not found');
    }
    if (!modifiedCount) {
      throw new InvariantError('Failed to update playlist');
    }
  }

  async deletePlaylistById(playlistId) {
    const deletedPlaylist = await this.playlistModel.deleteOne({ _id: playlistId });

    const { deletedCount } = deletedPlaylist;
    if (!deletedCount) {
      throw new NotFoundError('Song not found');
    }
  }

  async verifyPlaylistOwner(playlistId, userId) {
    const playlist = await this.playlistModel.findById(playlistId);

    if (!playlist) {
      throw new NotFoundError('Playlist not found');
    }

    if (playlist.owner !== userId) {
      throw new AuthorizationError('Cannot proceed the request, authorization error');
    }
  }
}

module.exports = PlaylistsRepositoryMongoose;
