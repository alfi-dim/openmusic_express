const UserLogin = require('./UserLogin');
const UserLogout = require('./UserLogout');
const RefreshAccessToken = require('./RefreshAccessToken');

class AuthenticationsUseCase {
  constructor(authenticationsRepository, usersRepository, hashEngine, tokenManager) {
    this.authenticationsRepository = authenticationsRepository;
    this.usersRepository = usersRepository;
    this.hashEngine = hashEngine;
    this.tokenManager = tokenManager;
  }

  async login(useCasePayload) {
    return new UserLogin(
      this.authenticationsRepository,
      this.usersRepository,
      this.hashEngine,
      this.tokenManager,
    ).execute(useCasePayload);
  }

  async logout(useCasePayload) {
    return new UserLogout(this.authenticationsRepository).execute(useCasePayload);
  }

  async refreshAccessToken(useCasePayload) {
    return new RefreshAccessToken(this.authenticationsRepository, this.tokenManager)
      .execute(useCasePayload);
  }
}

module.exports = AuthenticationsUseCase;
