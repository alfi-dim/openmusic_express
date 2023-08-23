const UseCase = require('../../../Interfaces/contracts/UseCase');
const Playlist = require('../../../Domains/Entities/playlistEntity');

class AddNewPlaylist extends UseCase {
  constructor(playlistsRepository, idGenerator, tokenManager, payloadValidator) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.idGenerator = idGenerator;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { token, body } = useCasePayload;
    this.payloadValidator.validate('playlists', body);
    this.payloadValidator.validate('token', { token });

    await this.tokenManager.verifyAccessToken(token);
    const { userId } = await this.tokenManager.decodePayload(token);
    const id = `playlists-${this.idGenerator(16)}`;
    const payload = {
      id,
      ...body,
      userId,
    };
    const playlist = new Playlist(payload);
    const playlistId = await this.playlistsRepository.addNewPlaylist(playlist);
    return {
      status: 'success',
      data: {
        playlistId,
      },
    };
  }
}

module.exports = AddNewPlaylist;
