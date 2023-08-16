const AddNewSong = require('./AddNewSong');
const GetAllSong = require('./GetAllSong');
const GetSongById = require('./GetSongById');
const UpdateSongById = require('./UpdateSongById');
const DeleteSongById = require('./DeleteSongById');

class SongsUseCase {
  constructor(songsRepository, idGenerator) {
    this.songsRepository = songsRepository;
    this.idGenerator = idGenerator;
  }

  addNewSong(useCasePayload) {
    return new AddNewSong(this.songsRepository, this.idGenerator).execute(useCasePayload);
  }

  getAllSong() {
    return new GetAllSong(this.songsRepository).execute();
  }

  getSongById(useCasePayload) {
    return new GetSongById(this.songsRepository).execute(useCasePayload);
  }

  updateSongById(useCasePayload) {
    return new UpdateSongById(this.songsRepository).execute(useCasePayload);
  }

  deleteSongById(useCasePayload) {
    return new DeleteSongById(this.songsRepository).execute(useCasePayload);
  }
}

module.exports = SongsUseCase;
