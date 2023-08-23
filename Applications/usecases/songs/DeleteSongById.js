const UseCase = require('../../../Interfaces/contracts/UseCase');

class DeleteSongById extends UseCase {
  constructor(songsRepository) {
    super();
    this.songsRepository = songsRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    await this.songsRepository.deleteSongById(id);
    return {
      status: 'success',
    };
  }
}

module.exports = DeleteSongById;
