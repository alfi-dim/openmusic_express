const AddNewPlaylist = require('./AddNewPlaylist');
const AddSongToPlaylist = require('./AddSongToPlaylist');
const DeleteSongFromPlaylist = require('./DeleteSongFromPlaylist');
const UpdatePlaylistById = require('./UpdatePlaylistById');
const DeletePlaylistById = require('./DeletePlaylistById');
const GetPlaylistById = require('./GetPlaylistById');

class PlaylistsUseCase {
  constructor(playlistsRepository, songsRepository, idGenerator, tokenManager) {
    this.playlistsRepository = playlistsRepository;
    this.songsRepository = songsRepository;
    this.idGenerator = idGenerator;
    this.tokenManager = tokenManager;
  }

  async addNewPlaylist(useCasePayload) {
    return new AddNewPlaylist(this.playlistsRepository, this.idGenerator, this.tokenManager)
      .execute(useCasePayload);
  }

  async addSongToPlaylist(useCasePayload) {
    return new AddSongToPlaylist(this.playlistsRepository, this.songsRepository, this.tokenManager)
      .execute(useCasePayload);
  }

  async deleteSongFromPlaylist(useCasePayload) {
    return new DeleteSongFromPlaylist(this.playlistsRepository, this.tokenManager)
      .execute(useCasePayload);
  }

  async updatePlaylistById(useCasePayload) {
    return new UpdatePlaylistById(this.playlistsRepository, this.tokenManager)
      .execute(useCasePayload);
  }

  async deletePlaylistById(useCasePayload) {
    return new DeletePlaylistById(this.playlistsRepository, this.tokenManager)
      .execute(useCasePayload);
  }

  async getPlaylistById(useCasePayload) {
    return new GetPlaylistById(this.playlistsRepository, this.songsRepository, this.tokenManager)
      .execute(useCasePayload);
  }
}

module.exports = PlaylistsUseCase;
