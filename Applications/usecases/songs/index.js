const AddNewSong = require('./AddNewSong');
const GetAllSong = require('./GetAllSong');
const GetSongById = require('./GetSongById');
const UpdateSongById = require('./UpdateSongById');
const DeleteSongById = require('./DeleteSongById');

class SongsUseCase {
  constructor(songsRepository, idGenerator, payloadValidator) {
    this.songsRepository = songsRepository;
    this.idGenerator = idGenerator;
    this.payloadValidator = payloadValidator;
  }

  addNewSong(useCasePayload) {
    return new AddNewSong(this.songsRepository, this.idGenerator, this.payloadValidator)
      .execute(useCasePayload);
  }

  getAllSong() {
    return new GetAllSong(this.songsRepository).execute();
  }

  getSongById(useCasePayload) {
    return new GetSongById(this.songsRepository).execute(useCasePayload);
  }

  updateSongById(useCasePayload) {
    return new UpdateSongById(this.songsRepository, this.payloadValidator).execute(useCasePayload);
  }

  deleteSongById(useCasePayload) {
    return new DeleteSongById(this.songsRepository).execute(useCasePayload);
  }
}

module.exports = SongsUseCase;
