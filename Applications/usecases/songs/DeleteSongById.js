const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class DeleteSongById extends UseCase {
  constructor(songsRepository) {
    super();
    this.songsRepository = songsRepository;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { id } = useCasePayload;
    await this.songsRepository.deleteSongById(id);
    return {
      status: 'success',
    };
  }

  validatePayload(payload) {
    const { id } = payload;

    if (!id) {
      throw new InvariantError('Required data not found');
    }

    if (typeof id !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = DeleteSongById;
