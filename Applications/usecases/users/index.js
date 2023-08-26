const CreateNewUser = require('./CreateNewUser');
const VerifyIfUsernameIsAvailable = require('./VerifyIfUsernameIsAvailable');
const GetUserById = require('./GetUserById');

class UsersUseCase {
  constructor(usersRepository, idGenerator, hashEngine, payloadValidator) {
    this.usersRepository = usersRepository;
    this.idGenerator = idGenerator;
    this.hashEngine = hashEngine;
    this.payloadValidator = payloadValidator;
  }

  createNewUser(useCasePayload) {
    return new CreateNewUser(
      this.usersRepository,
      this.idGenerator,
      this.hashEngine,
      this.payloadValidator,
    )
      .execute(useCasePayload);
  }

  verifyIfUsernameIsAvailable(useCasePayload) {
    return new VerifyIfUsernameIsAvailable(this.usersRepository, this.payloadValidator)
      .execute(useCasePayload);
  }

  getUserById(useCasePayload) {
    return new GetUserById(this.usersRepository).execute(useCasePayload);
  }
}

module.exports = UsersUseCase;
