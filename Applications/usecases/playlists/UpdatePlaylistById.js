const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class UpdatePlaylistById extends UseCase {
  constructor(playlistsRepository, tokenManager, payloadValidator) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    // this.validatePayload(useCasePayload);
    const { token, playlistId, body } = useCasePayload;
    this.payloadValidator.validate('playlists', body);
    this.payloadValidator.validate('token', { token });

    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.updatePlaylistById(playlistId, body);
    return {
      status: 'success',
    };
  }

  validatePayload(payload) {
    const { token, playlistId, body } = payload;

    if (!token || !body || !body.name || !playlistId) {
      throw new InvariantError('Required data not found');
    }
    const { name } = body;

    if (typeof token !== 'string' || typeof name !== 'string' || typeof playlistId !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = UpdatePlaylistById;
