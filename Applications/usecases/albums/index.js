const AddNewAlbum = require('./AddNewAlbum');
const GetAllAlbum = require('./GetAllAlbum');
const GetAlbumById = require('./GetAlbumById');
const UpdateAlbumById = require('./UpdateAlbumById');
const DeleteAlbumById = require('./DeleteAlbumById');

class AlbumsUseCase {
  constructor(albumsRepository, idGenerator) {
    this.albumsRepository = albumsRepository;
    this.idGenerator = idGenerator;
  }

  addNewAlbum(useCasePayload) {
    return new AddNewAlbum(this.albumsRepository, this.idGenerator).execute(useCasePayload);
  }

  getAllAlbum() {
    return new GetAllAlbum(this.albumsRepository).execute();
  }

  getAlbumById(useCasePayload) {
    return new GetAlbumById(this.albumsRepository).execute(useCasePayload);
  }

  updateAlbumById(useCasePayload) {
    return new UpdateAlbumById(this.albumsRepository).execute(useCasePayload);
  }

  deleteAlbumById(useCasePayload) {
    return new DeleteAlbumById(this.albumsRepository).execute(useCasePayload);
  }
}

module.exports = AlbumsUseCase;
