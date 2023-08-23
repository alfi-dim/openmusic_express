const UseCase = require('../../../Interfaces/contracts/UseCase');

class VerifyIfUsernameIsAvailable extends UseCase {
  constructor(usersRepository, payloadValidator) {
    super();
    this.usersRepository = usersRepository;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    this.payloadValidator.validate('username', useCasePayload);
    const { username } = useCasePayload;
    await this.usersRepository.verifyIfUsernameIsAvailable(username);

    return {
      status: 'success',
      data: {
        available: true,
      },
    };
  }
}

module.exports = VerifyIfUsernameIsAvailable;
