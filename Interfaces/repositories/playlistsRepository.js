const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError');

class PlaylistsRepository {
  constructor(playlistModel) {
    this.playlistModel = playlistModel;
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

module.exports = PlaylistsRepository;
