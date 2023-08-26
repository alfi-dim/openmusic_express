const UseCase = require('../../../Interfaces/contracts/UseCase');

class GetPlaylistById extends UseCase {
  constructor(playlistsRepository, songsRepository, tokenManager, payloadValidator) {
    super();
    this.playlistsRepository = playlistsRepository;
    this.songsRepository = songsRepository;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { id, token } = useCasePayload;
    this.payloadValidator.validate('token', { token });

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
}

module.exports = GetPlaylistById;
