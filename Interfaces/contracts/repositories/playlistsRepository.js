/* eslint-disable no-unused-vars,class-methods-use-this */

class PlaylistsRepository {
  async addNewPlaylist(playlist) {
    throw new Error('Method not yet implemented');
  }

  async addSongToPlaylist(playlistId, songId) {
    throw new Error('Method not yet implemented');
  }

  async getPlaylistById(playlistId) {
    throw new Error('Method not yet implemented');
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    throw new Error('Method not yet implemented');
  }

  async updatePlaylistById(playlistId, payload) {
    throw new Error('Method not yet implemented');
  }

  async deletePlaylistById(playlistId) {
    throw new Error('Method not yet implemented');
  }

  async verifyPlaylistOwner(playlistId, userId) {
    throw new Error('Method not yet implemented');
  }
}

module.exports = PlaylistsRepository;
