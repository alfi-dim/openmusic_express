const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class DeleteSongFromPlaylist extends UseCase {
  constructor(playlistsRepository, tokenManager) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { token, songId, playlistId } = useCasePayload;
    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.deleteSongFromPlaylist(playlistId, songId);
    return {
      status: 'success',
    };
  }

  validatePayload(payload) {
    const { token, songId, playlistId } = payload;

    if (!token || !songId || !playlistId) {
      throw new InvariantError('Required data not found');
    }

    if (typeof token !== 'string' || typeof songId !== 'string' || typeof playlistId !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = DeleteSongFromPlaylist;
