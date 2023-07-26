const Album = require('../../Entities/albumEntity');

class AlbumUseCase {
  constructor(albumRepository, idGenerator) {
    this.albumRepository = albumRepository;
    this.idGenerator = idGenerator;
  }

  async addNewAlbumUseCase(useCasePayload) {
    const id = `albums-${this.idGenerator(16)}`;
    const album = new Album(id, useCasePayload);
    const albumId = await this.albumRepository.addNewAlbum(album);
    return {
      status: 'success',
      data: {
        id: albumId,
      },
    };
  }

  async getAllAlbumUseCase() {
    const albums = await this.albumRepository.getAllAlbum();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdUseCase(id) {
    const album = await this.albumRepository.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async updateAlbumByIdUseCase(id, useCasePayload) {
    await this.albumRepository.updateAlbumById(id, useCasePayload);
    return {
      status: 'success',
    };
  }

  async deleteAlbumByIdUseCase(id) {
    await this.albumRepository.deleteAlbumById(id);
    return {
      status: 'success',
    };
  }
}

module.exports = AlbumUseCase;
