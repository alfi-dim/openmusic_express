const AuthenticationsRepository = require('../../Interfaces/contracts/repositories/authenticationsRepository');
const InvariantError = require('../../Exceptions/InvariantError');

class AuthenticationsRepositoryMongoose extends AuthenticationsRepository {
  constructor(authenticationModel) {
    super();
    this.authenticationModel = authenticationModel;
  }

  async addNewRefreshToken(token) {
    const { _id } = await this.authenticationModel.create({ token });
    if (!_id) {
      throw new InvariantError('Fail to add token into database');
    }
  }

  async deleteRefreshToken(token) {
    const { deletedCount } = await this.authenticationModel.deleteOne({ token });
    if (!deletedCount) {
      throw new InvariantError('token not found');
    }
  }

  async verifyIfRefreshTokenIsExist(token) {
    const refreshToken = await this.authenticationModel.findOne({ token });
    if (!refreshToken) {
      throw new InvariantError('Token not found');
    }
  }
}

module.exports = AuthenticationsRepositoryMongoose;
