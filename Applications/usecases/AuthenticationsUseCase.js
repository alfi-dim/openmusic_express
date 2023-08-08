const AuthenticationEntity = require('../../Entities/authenticationEntity');

class AuthenticationsUseCase {
  constructor(authenticationsRepository, usersRepository, hashEngine, tokenManager) {
    this.authenticationsRepository = authenticationsRepository;
    this.usersRepository = usersRepository;
    this.hashEngine = hashEngine;
    this.tokenManager = tokenManager;
  }

  async loginUseCase(useCasePayload) {
    const { username, password } = useCasePayload;
    const {
      _id: userId,
      password: hashedPassword,
    } = await this.usersRepository.getUserByUsername(username);
    await this.hashEngine.comparePassword(password, hashedPassword);
    const accessToken = await this.tokenManager.generateAccessToken({ username, userId });
    const refreshToken = await this.tokenManager.generateRefreshToken({ username, userId });
    const authenticationEntity = new AuthenticationEntity({ refreshToken, accessToken });
    await this.authenticationsRepository.addNewRefreshToken(authenticationEntity.refreshToken);

    return {
      status: 'success',
      data: {
        ...authenticationEntity,
      },
    };
  }

  async logoutUseCase(useCasePayload) {
    const { refreshToken } = useCasePayload;
    await this.authenticationsRepository.deleteRefreshToken(refreshToken);
    return {
      status: 'success',
    };
  }

  async refreshAccessTokenUseCase(useCasePayload) {
    const { refreshToken } = useCasePayload;
    await this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authenticationsRepository.verifyIfRefreshTokenIsExist(refreshToken);

    const { username, userId } = await this.tokenManager.decodePayload(refreshToken);

    const accessToken = await this.tokenManager.generateAccessToken({ username, userId });

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }
}

module.exports = AuthenticationsUseCase;
