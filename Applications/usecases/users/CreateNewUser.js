const UseCase = require('../../../Interfaces/contracts/UseCase');
const User = require('../../../Entities/userEntity');
const InvariantError = require('../../../Exceptions/InvariantError');

class CreateNewUser extends UseCase {
  constructor(usersRepository, idGenerator, hashEngine) {
    super();
    this.usersRepository = usersRepository;
    this.idGenerator = idGenerator;
    this.hashEngine = hashEngine;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
    const { username, password, fullname } = useCasePayload;
    await this.usersRepository.verifyIfUsernameIsAvailable(username);
    const id = `users-${this.idGenerator(16)}`;
    const hashedPassword = await this.hashEngine.hash(password, 16);

    const user = new User(id, username, fullname, hashedPassword);

    const userId = await this.usersRepository.createNewUser(user);
    return {
      status: 'success',
      data: {
        userId,
      },
    };
  }

  validatePayload(payload) {
    const { username, password, fullname } = payload;

    if (!username || !password || !fullname) {
      throw new InvariantError('Required data not found');
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = CreateNewUser;
