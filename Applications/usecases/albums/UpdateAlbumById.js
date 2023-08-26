const UseCase = require('../../../Interfaces/contracts/UseCase');

class UpdateAlbumById extends UseCase {
  constructor(albumsRepository, payloadValidator) {
    super();
    this.albumsRepository = albumsRepository;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    const { id, body } = useCasePayload;
    this.payloadValidator.validate('albums', body);
    await this.albumsRepository.updateAlbumById(id, body);
    return {
      status: 'success',
    };
  }
}

module.exports = UpdateAlbumById;
