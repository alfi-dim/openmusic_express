const UseCase = require('../../../Interfaces/contracts/UseCase');

class GetSongById extends UseCase {
  constructor(songsRepository) {
    super();
    this.songsRepository = songsRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    const song = await this.songsRepository.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }
}

module.exports = GetSongById;
