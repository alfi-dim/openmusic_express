const UseCase = require('../../../Interfaces/contracts/UseCase');

class DeletePlaylistById extends UseCase {
  constructor(playlistsRepository, tokenManager, payloadValidator) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { token, playlistId } = useCasePayload;
    this.payloadValidator.validate('token', { token });
    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.deletePlaylistById(playlistId);
    return {
      status: 'success',
    };
  }
}

module.exports = DeletePlaylistById;
