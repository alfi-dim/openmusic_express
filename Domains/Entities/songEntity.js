class SongEntity {
  constructor(id, {
    title, year, performer, genre, duration, albumId,
  }) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = id;
    this.title = title;
    this.year = year;
    this.performer = performer;
    this.genre = genre;
    this.duration = duration;
    this.album_id = albumId;
  }
}

module.exports = SongEntity;
