const User = require('../../Entities/userEntity');

class UserUseCase {
  constructor(userRepository, idGenerator, hashEngine) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
    this.hashEngine = hashEngine;
  }

  async createNewUserUseCase(useCasePayload) {
    const { username } = useCasePayload;
    await this.userRepository.verifyIfUsernameIsAvailable(username);
    const id = `users-${this.idGenerator(16)}`;
    const { password } = useCasePayload;
    const hashedPassword = await this.hashEngine.hash(password, 16);

    const user = new User(id, useCasePayload, hashedPassword);

    const userId = await this.userRepository.createNewUser(user);
    return {
      status: 'success',
      data: {
        userId,
      },
    };
  }

  async verifyIfUsernameIsAvailableUseCase(username) {
    await this.userRepository.verifyIfUsernameIsAvailable(username);

    return {
      status: 'success',
      data: {
        available: true,
      },
    };
  }
}

module.exports = UserUseCase;
