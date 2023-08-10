const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class UpdateAlbumById extends UseCase {
  constructor(albumsRepository) {
    super();
    this.albumsRepository = albumsRepository;
  }

  async execute(useCasePayload) {
    const { id, body } = useCasePayload;
    this.validatePayload(body);
    await this.albumsRepository.updateAlbumById(id, body);
    return {
      status: 'success',
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

module.exports = UpdateAlbumById;
