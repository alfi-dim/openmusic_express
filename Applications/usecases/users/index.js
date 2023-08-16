const CreateNewUser = require('./CreateNewUser');
const VerifyIfUsernameIsAvailable = require('./VerifyIfUsernameIsAvailable');
const GetUserById = require('./GetUserById');

class UsersUseCase {
  constructor(usersRepository, idGenerator, hashEngine) {
    this.usersRepository = usersRepository;
    this.idGenerator = idGenerator;
    this.hashEngine = hashEngine;
  }

  createNewUser(useCasePayload) {
    return new CreateNewUser(this.usersRepository, this.idGenerator, this.hashEngine)
      .execute(useCasePayload);
  }

  verifyIfUsernameIsAvailable(useCasePayload) {
    return new VerifyIfUsernameIsAvailable(this.usersRepository).execute(useCasePayload);
  }

  getUserById(useCasePayload) {
    return new GetUserById(this.usersRepository).execute(useCasePayload);
  }
}

module.exports = UsersUseCase;
