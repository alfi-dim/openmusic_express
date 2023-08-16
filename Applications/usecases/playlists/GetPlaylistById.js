const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class GetPlaylistById extends UseCase {
  constructor(playlistsRepository, songsRepository, tokenManager) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.songsRepository = songsRepository;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { id, token } = useCasePayload;
    await this.tokenManager.verifyAccessToken(token);
    const playlist = await this.playlistsRepository.getPlaylistById(id);

    const { songs } = playlist;
    playlist.songs = await this.songsRepository.getSongByArrayOfIds(songs);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  validatePayload(payload) {
    const { id, token } = payload;

    if (!id || !token) {
      throw new InvariantError('Required data not found');
    }

    if (typeof id !== 'string' || typeof token !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = GetPlaylistById;
