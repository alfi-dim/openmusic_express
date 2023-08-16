const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class UpdateSongById extends UseCase {
  constructor(songsRepository) {
    super();
    this.songsRepository = songsRepository;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { id, body } = useCasePayload;
    await this.songsRepository.updateSongById(id, body);
    return {
      status: 'success',
    };
  }

  validatePayload(payload) {
    const { id, body } = payload;

    if (!id || !body) {
      throw new InvariantError('Required data not found');
    }
    const {
      title, year, performer, genre, duration,
    } = body;

    if (!title || !year || !performer || !genre || !duration) {
      throw new InvariantError('Required data not found');
    }

    if (typeof title !== 'string' || typeof year !== 'number' || typeof performer !== 'string' || typeof genre !== 'string' || typeof duration !== 'number') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = UpdateSongById;
