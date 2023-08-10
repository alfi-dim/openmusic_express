const UseCase = require('../../../Interfaces/contracts/UseCase');

class DeleteAlbumById extends UseCase {
  constructor(albumsRepository) {
    super();
    this.albumsRepository = albumsRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    await this.albumsRepository.deleteAlbumById(id);
    return {
      status: 'success',
    };
  }
}

module.exports = DeleteAlbumById;
