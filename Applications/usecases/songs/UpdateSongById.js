const UseCase = require('../../../Interfaces/contracts/UseCase');

class UpdateSongById extends UseCase {
  constructor(songsRepository, payloadValidator) {
    super();
    this.songsRepository = songsRepository;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { id, body } = useCasePayload;
    this.payloadValidator.validate('songs', body);

    await this.songsRepository.updateSongById(id, body);
    return {
      status: 'success',
    };
  }
}

module.exports = UpdateSongById;
