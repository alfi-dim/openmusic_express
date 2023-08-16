const UseCase = require('../../../Interfaces/contracts/UseCase');
const Playlist = require('../../../Domains/Entities/playlistEntity');
const InvariantError = require('../../../Exceptions/InvariantError');

class AddNewPlaylist extends UseCase {
  constructor(playlistsRepository, idGenerator, tokenManager) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.idGenerator = idGenerator;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { token, body } = useCasePayload;
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

  validatePayload(payload) {
    const { token, body } = payload;

    if (!body || !body.name || !token) {
      throw new InvariantError('Required data not found');
    }

    const { name } = body;

    if (typeof name !== 'string' || typeof token !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = AddNewPlaylist;
