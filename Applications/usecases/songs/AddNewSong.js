const UseCase = require('../../../Interfaces/contracts/UseCase');
const Song = require('../../../Domains/Entities/songEntity');

class AddNewSong extends UseCase {
  constructor(songsRepository, idGenerator, payloadValidator) {
    super();
    this.songsRepository = songsRepository;
    this.idGenerator = idGenerator;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    this.payloadValidator.validate('songs', useCasePayload);
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
}

module.exports = AddNewSong;
