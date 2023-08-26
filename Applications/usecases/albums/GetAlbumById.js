const UseCase = require('../../../Interfaces/contracts/UseCase');

class GetAlbumById extends UseCase {
  constructor(albumsRepository) {
    super();
    this.albumsRepository = albumsRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    const album = await this.albumsRepository.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }
}

module.exports = GetAlbumById;
