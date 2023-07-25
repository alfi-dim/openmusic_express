const Song = require('../../Entities/songEntity');

class SongsUseCase {
  constructor(songRepository, idGenerator) {
    this.songRepository = songRepository;
    this.idGenerator = idGenerator;
  }

  async addNewSongUseCase(useCasePayload) {
    const id = `songs-${this.idGenerator(16)}`;
    const song = new Song(id, useCasePayload);
    const songId = await this.songRepository.addNewSong(song);
    return {
      status: 'success',
      data: {
        songId,
      },
    };
  }

  async getAllSongUseCase() {
    const songs = await this.songRepository.getAllSong();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdUseCase(id) {
    const song = await this.songRepository.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async updateSongByIdUseCase(id, useCasePayload) {
    await this.songRepository.updateSongById(id, useCasePayload);
    return {
      status: 'success',
    };
  }

  async deleteSongByIdUseCase(id) {
    await this.songRepository.deleteSongById(id);
    return {
      status: 'success',
    };
  }
}

module.exports = SongsUseCase;
