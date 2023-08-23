const UseCase = require('../../../Interfaces/contracts/UseCase');

class UserLogout extends UseCase {
  constructor(authenticationsRepository, payloadValidator) {
    super();
    this.authenticationsRepository = authenticationsRepository;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    this.payloadValidator.validate('refreshToken', useCasePayload);
    const { refreshToken } = useCasePayload;
    await this.authenticationsRepository.deleteRefreshToken(refreshToken);
    return {
      status: 'success',
    };
  }
}

module.exports = UserLogout;
