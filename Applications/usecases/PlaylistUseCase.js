const Playlist = require('../../Entities/playlistEntity');

class PlaylistUseCase {
  constructor(playlistsRepository, songsRepository, idGenerator, tokenManager) {
    this.playlistsRepository = playlistsRepository;
    this.songsRepository = songsRepository;
    this.idGenerator = idGenerator;
    this.tokenManager = tokenManager;
  }

  async addNewPlaylistUseCase(useCasePayload) {
    const { token } = useCasePayload;
    const userId = await this.tokenDecoder(token);
    const id = `playlists-${this.idGenerator(16)}`;
    const playlist = new Playlist(id, useCasePayload, userId);
    const playlistId = await this.playlistsRepository.addNewPlaylist(playlist);
    return {
      status: 'success',
      data: {
        playlistId,
      },
    };
  }

  async addSongToPlaylistUseCase(useCasePayload) {
    const { token, songId, playlistId } = useCasePayload;
    const userId = await this.tokenDecoder(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.songsRepository.verifyIfSongIsExist(songId);
    await this.playlistsRepository.addSongToPlaylist(playlistId, songId);
    return {
      status: 'success',
    };
  }

  async deleteSongFromPlaylistUseCase(useCasePayload) {
    const { token, songId, playlistId } = useCasePayload;
    const userId = await this.tokenDecoder(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.deleteSongFromPlaylist(playlistId, songId);
    return {
      status: 'success',
    };
  }

  async updatePlaylistByIdUseCase(useCasePayload) {
    const { token, playlistId, payload } = useCasePayload;
    const userId = await this.tokenDecoder(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.updatePlaylistById(playlistId, payload);
    return {
      status: 'success',
    };
  }

  async deletePlaylistByIdUseCase(useCasePayload) {
    const { token, playlistId } = useCasePayload;
    const userId = await this.tokenDecoder(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.deletePlaylistById(playlistId);
    return {
      status: 'success',
    };
  }

  async tokenDecoder(token) {
    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);
    return userId;
  }
}

module.exports = PlaylistUseCase;
