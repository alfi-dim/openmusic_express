const UseCase = require('../../../Interfaces/contracts/UseCase');
const AuthenticationEntity = require('../../../Domains/Entities/authenticationEntity');
const InvariantError = require('../../../Exceptions/InvariantError');

class UserLogin extends UseCase {
  constructor(authenticationsRepository, usersRepository, hashEngine, tokenManager) {
    super();
    this.authenticationsRepository = authenticationsRepository;
    this.usersRepository = usersRepository;
    this.hashEngine = hashEngine;
    this.tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this.validatePayload(useCasePayload);
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

  validatePayload(payload) {
    const { username, password } = payload;
    if (!username || !password) {
      throw new InvariantError('Required data not found');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new InvariantError('Invalid data type requirement');
    }
  }
}

module.exports = UserLogin;
