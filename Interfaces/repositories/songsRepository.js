const NotFoundError = require('../../exception/NotFoundError');
const InvariantError = require('../../exception/InvariantError');

class SongsRepository {
  constructor(songModel, formatModelUtils) {
    this.songModel = songModel;
    this.formatModelUtils = formatModelUtils;
  }

  async addNewSong(song) {
    const { _id } = await this.songModel.create(song);
    if (!_id) {
      throw new InvariantError('create new song failed!');
    }
    return _id;
  }

  async getAllSong() {
    const songs = await this.songModel.find({});
    return songs.map(this.formatModelUtils.formatModelSong);
  }

  async getSongById(id) {
    const song = await this.songModel.findOne({ _id: id });
    if (!song) {
      throw new NotFoundError('Song not found');
    }
    return this.formatModelUtils.formatModelSong(song);
  }

  async updateSongById(id, updateData) {
    const updatedSong = await this.songModel.updateOne({ _id: id }, updateData);
    const { matchedCount, modifiedCount } = updatedSong;
    if (!matchedCount) {
      throw new NotFoundError('Song not found');
    }
    if (!modifiedCount) {
      throw new InvariantError('Failed to update song');
    }
  }

  async deleteSongById(id) {
    const deletedSong = await this.songModel.deleteOne({ _id: id });
    const { deletedCount } = deletedSong;
    if (!deletedCount) {
      throw new NotFoundError('Song not found');
    }
  }

  async verifyIfSongIsExist(id) {
    const song = await this.songModel.findOne({ _id: id });
    if (!song) {
      throw new NotFoundError('Song not found');
    }
  }
}

module.exports = SongsRepository;
