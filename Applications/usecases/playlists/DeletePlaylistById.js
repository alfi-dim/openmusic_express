const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class DeletePlaylistById extends UseCase {
  constructor(playlistsRepository, tokenManager) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { token, playlistId } = useCasePayload;
    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.deletePlaylistById(playlistId);
    return {
      status: 'success',
    };
  }

  validatePayload(payload) {
    const { token, playlistId } = payload;

    if (!token || !playlistId) {
      throw new InvariantError('Required data not found');
    }

    if (typeof token !== 'string' || typeof playlistId !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = DeletePlaylistById;
