const UseCase = require('../../../Interfaces/contracts/UseCase');
const Album = require('../../../Domains/Entities/albumEntity');

class AddNewAlbum extends UseCase {
  constructor(albumsRepository, idGenerator, payloadValidator) {
    super();
    this.albumsRepository = albumsRepository;
    this.idGenerator = idGenerator;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    this.payloadValidator.validate('albums', useCasePayload);
    const id = `albums-${this.idGenerator(16)}`;
    const album = new Album(id, useCasePayload);
    const albumId = await this.albumsRepository.addNewAlbum(album);
    return {
      status: 'success',
      data: {
        id: albumId,
      },
    };
  }
}

module.exports = AddNewAlbum;
