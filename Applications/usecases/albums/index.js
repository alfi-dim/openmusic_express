const AddNewAlbum = require('./AddNewAlbum');
const GetAllAlbum = require('./GetAllAlbum');
const GetAlbumById = require('./GetAlbumById');
const UpdateAlbumById = require('./UpdateAlbumById');
const DeleteAlbumById = require('./DeleteAlbumById');

class AlbumsUseCase {
  constructor(albumsRepository, idGenerator, payloadValidator) {
    this.albumsRepository = albumsRepository;
    this.idGenerator = idGenerator;
    this.payloadValidator = payloadValidator;
  }

  addNewAlbum(useCasePayload) {
    return new AddNewAlbum(this.albumsRepository, this.idGenerator, this.payloadValidator)
      .execute(useCasePayload);
  }

  getAllAlbum() {
    return new GetAllAlbum(this.albumsRepository).execute();
  }

  getAlbumById(useCasePayload) {
    return new GetAlbumById(this.albumsRepository).execute(useCasePayload);
  }

  updateAlbumById(useCasePayload) {
    return new UpdateAlbumById(this.albumsRepository, this.payloadValidator).execute(useCasePayload);
  }

  deleteAlbumById(useCasePayload) {
    return new DeleteAlbumById(this.albumsRepository).execute(useCasePayload);
  }
}

module.exports = AlbumsUseCase;
