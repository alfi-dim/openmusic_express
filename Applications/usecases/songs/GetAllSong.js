const UseCase = require('../../../Interfaces/contracts/UseCase');

class GetAllSong extends UseCase {
  constructor(songsRepository) {
    super();
    this.songsRepository = songsRepository;
  }

  async execute() {
    const songs = await this.songsRepository.getAllSong();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }
}

module.exports = GetAllSong;
