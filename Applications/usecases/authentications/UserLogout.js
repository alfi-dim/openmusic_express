const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class UserLogout extends UseCase {
  constructor(authenticationsRepository) {
    super();
    this.authenticationsRepository = authenticationsRepository;
  }

  async execute(useCasePayload) {
    const { refreshToken } = useCasePayload;
    await this.authenticationsRepository.deleteRefreshToken(refreshToken);
    return {
      status: 'success',
    };
  }

  validatePayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new InvariantError('Required data not found');
    }

    if (typeof refreshToken !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = UserLogout;
