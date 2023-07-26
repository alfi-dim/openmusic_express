const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class AlbumsRepository {
  constructor(albumModel) {
    this.albumModel = albumModel;
  }

  async addNewAlbum(album) {
    const { _id } = await this.albumModel.create(album);
    if (!_id) {
      throw new InvariantError('Fail to create album');
    }

    return _id;
  }

  async getAllAlbum() {
    return this.albumModel.find({});
  }

  async getAlbumById(id) {
    const album = this.albumModel.findOne({ _id: id });
    if (!album) {
      throw new NotFoundError('Album not found');
    }
    return album;
  }

  async updateAlbumById(id, updateData) {
    const updatedAlbum = await this.albumModel.updateOne({ _id: id }, updateData);
    const { matchedCount, modifiedCount } = updatedAlbum;
    if (!matchedCount) {
      throw new NotFoundError('Album not found');
    }
    if (!modifiedCount) {
      throw new InvariantError('Failed to update album');
    }
  }

  async deleteAlbumById(id) {
    const deletedAlbum = await this.albumModel.deleteOne({ _id: id });
    const { deletedCount } = deletedAlbum;
    if (!deletedCount) {
      throw new NotFoundError('Album not found');
    }
  }
}

module.exports = AlbumsRepository;
