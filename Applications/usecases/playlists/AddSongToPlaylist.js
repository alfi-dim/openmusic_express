const UseCase = require('../../../Interfaces/contracts/UseCase');

class AddSongToPlaylist extends UseCase {
  constructor(playlistsRepository, songsRepository, tokenManager, payloadValidator) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.songsRepository = songsRepository;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { token, body, playlistId } = useCasePayload;
    this.payloadValidator.validate('songId', body);
    this.payloadValidator.validate('token', { token });

    const { songId } = body;
    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);

    await this.playlistsRepository.verifyPlaylistOwner(playlistId, userId);
    await this.songsRepository.verifyIfSongIsExist(songId);
    await this.playlistsRepository.addSongToPlaylist(playlistId, songId);
    return {
      status: 'success',
    };
  }
}

module.exports = AddSongToPlaylist;
