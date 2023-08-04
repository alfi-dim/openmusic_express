const InvariantError = require('../../exception/InvariantError');

class UsersRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createNewUser(user) {
    const { _id } = await this.userModel.create(user);
    if (!_id) {
      throw new InvariantError('Failed to create new user');
    }
    return _id;
  }

  async verifyIfUsernameIsAvailable(username) {
    const isUsernameAlreadyOwned = await this.userModel.findOne({ username });
    if (isUsernameAlreadyOwned) {
      throw new InvariantError('Username is not available');
    }
  }

  async getUserByUsername(username) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new InvariantError('Invalid login credentials. Please check your username and password and try again.');
    }

    return user;
  }
}
module.exports = UsersRepository;
