const UseCase = require('../../../Interfaces/contracts/UseCase');
const Album = require('../../../Domains/Entities/albumEntity');
const InvariantError = require('../../../Exceptions/InvariantError');

class AddNewAlbum extends UseCase {
  constructor(albumsRepository, idGenerator) {
    super();
    this.albumsRepository = albumsRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
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

  validatePayload(payload) {
    const { name, cover, year } = payload;

    if (!name || !cover || !year) {
      throw new InvariantError('Required data not found');
    }

    if (typeof name !== 'string' || typeof cover !== 'string' || typeof year !== 'number') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = AddNewAlbum;
