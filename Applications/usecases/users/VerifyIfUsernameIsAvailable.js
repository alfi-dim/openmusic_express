const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class VerifyIfUsernameIsAvailable extends UseCase {
  constructor(usersRepository) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { username } = useCasePayload;
    await this.usersRepository.verifyIfUsernameIsAvailable(username);

    return {
      status: 'success',
      data: {
        available: true,
      },
    };
  }

  validatePayload(payload) {
    const { username } = payload;

    if (!username) {
      throw new InvariantError('Required data not found');
    }

    if (typeof username !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = VerifyIfUsernameIsAvailable;
