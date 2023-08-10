const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class RefreshAccessToken extends UseCase {
  constructor(authenticationsRepository, tokenManager) {
    super();
    this.authenticationsRepository = authenticationsRepository;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { refreshToken } = useCasePayload;
    await this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authenticationsRepository.verifyIfRefreshTokenIsExist(refreshToken);

    const { username, userId } = await this.tokenManager.decodePayload(refreshToken);

    const accessToken = await this.tokenManager.generateAccessToken({ username, userId });

    return {
      status: 'success',
      data: {
        accessToken,
      },
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

module.exports = RefreshAccessToken;
