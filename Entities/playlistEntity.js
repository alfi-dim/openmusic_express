class PlaylistEntity {
  constructor(id, { name }, userId) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = id;
    this.name = name;
    this.owner = userId;
  }
}

module.exports = PlaylistEntity;
