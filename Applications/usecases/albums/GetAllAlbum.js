const UseCase = require('../../../Interfaces/contracts/UseCase');

class GetAllAlbum extends UseCase {
  constructor(albumsRepository) {
    super();
    this.albumsRepository = albumsRepository;
  }

  async execute() {
    const albums = await this.albumsRepository.getAllAlbum();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }
}

module.exports = GetAllAlbum;
