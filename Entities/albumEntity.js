class AlbumEntity {
  constructor(id, {
    name, year, cover,
  }) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = id;
    this.name = name;
    this.year = year;
    this.cover = cover;
  }
}

module.exports = AlbumEntity;
