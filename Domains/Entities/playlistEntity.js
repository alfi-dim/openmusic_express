class PlaylistEntity {
  constructor({
    id, name, songId, userId,
  }) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = id;
    this.name = name;
    this.songs = songId ? [songId] : [];
    this.owner = userId;
  }
}

module.exports = PlaylistEntity;
