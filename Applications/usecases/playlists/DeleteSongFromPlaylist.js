const UseCase = require('../../../Interfaces/contracts/UseCase');

class DeleteSongFromPlaylist extends UseCase {
  constructor(playlistsRepository, tokenManager, payloadValidator) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { token, body, playlistId } = useCasePayload;
    this.payloadValidator.validate('token', { token });
    this.payloadValidator.validate('songId', body);

    const { songId } = body;
    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.playlistsRepository.deleteSongFromPlaylist(playlistId, songId);
    return {
      status: 'success',
    };
  }
}

module.exports = DeleteSongFromPlaylist;
