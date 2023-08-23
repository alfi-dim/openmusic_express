const UseCase = require('../../../Interfaces/contracts/UseCase');

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
}

module.exports = GetUserById;
