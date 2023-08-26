const UseCase = require('../../../Interfaces/contracts/UseCase');

class RefreshAccessToken extends UseCase {
  constructor(authenticationsRepository, tokenManager, payloadValidator) {
    super();
    this.authenticationsRepository = authenticationsRepository;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    // this.validatePayload(useCasePayload);
    this.payloadValidator.validate('refreshToken', useCasePayload);
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
}

module.exports = RefreshAccessToken;
