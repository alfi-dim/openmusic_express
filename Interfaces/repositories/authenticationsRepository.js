const InvariantError = require('../../exception/InvariantError');

class AuthenticationsRepository {
  constructor(authenticationModel) {
    this.authenticationModel = authenticationModel;
  }

  addNewRefreshToken(token) {
    return this.authenticationModel.create({ token });
  }

  async deleteRefreshToken(token) {
    const { deletedCount } = await this.authenticationModel.deleteOne({ token });
    if (!deletedCount) {
      throw new InvariantError('token not found');
    }
  }
}

module.exports = AuthenticationsRepository;
