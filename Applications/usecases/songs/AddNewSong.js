const UseCase = require('../../../Interfaces/contracts/UseCase');
const Song = require('../../../Domains/Entities/songEntity');
const InvariantError = require('../../../Exceptions/InvariantError');

class AddNewSong extends UseCase {
  constructor(songsRepository, idGenerator) {
    super();
    this.songsRepository = songsRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const id = `songs-${this.idGenerator(16)}`;
    const song = new Song(id, useCasePayload);
    const songId = await this.songsRepository.addNewSong(song);
    return {
      status: 'success',
      data: {
        songId,
      },
    };
  }

  validatePayload(payload) {
    const {
      title, year, performer, genre, duration,
    } = payload;

    if (!title || !year || !performer || !genre || !duration) {
      throw new InvariantError('Required data not found');
    }

    if (typeof title !== 'string' || typeof year !== 'number' || typeof performer !== 'string' || typeof genre !== 'string' || typeof duration !== 'number') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = AddNewSong;
