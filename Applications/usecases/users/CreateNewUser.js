const UseCase = require('../../../Interfaces/contracts/UseCase');
const User = require('../../../Domains/Entities/userEntity');

class CreateNewUser extends UseCase {
  constructor(usersRepository, idGenerator, hashEngine, payloadValidator) {
    super();
    this.usersRepository = usersRepository;
    this.idGenerator = idGenerator;
    this.hashEngine = hashEngine;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    this.payloadValidator.validate('users', useCasePayload);
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
}

module.exports = CreateNewUser;
