const UseCase = require('../../../Interfaces/contracts/UseCase');
const InvariantError = require('../../../Exceptions/InvariantError');

class GetUserById extends UseCase {
  constructor(usersRepository) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(useCasePayload) {
    const { userId } = useCasePayload;
    const user = await this.usersRepository.getUserById(userId);

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }

  validatePayload(payload) {
    const { userId } = payload;

    if (!userId) {
      throw new InvariantError('Required data not found');
    }

    if (typeof userId !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = GetUserById;
