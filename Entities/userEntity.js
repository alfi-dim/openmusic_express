class UserEntity {
  constructor(id, username, fullname, hashedPassword) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = id;
    this.username = username;
    this.fullname = fullname;
    this.password = hashedPassword;
  }
}

module.exports = UserEntity;
