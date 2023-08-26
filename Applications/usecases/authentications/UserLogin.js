const UseCase = require('../../../Interfaces/contracts/UseCase');
const AuthenticationEntity = require('../../../Domains/Entities/authenticationEntity');

class UserLogin extends UseCase {
  constructor(
    authenticationsRepository,
    usersRepository,
    hashEngine,
    tokenManager,
    payloadValidator,
  ) {
    super();
    this.authenticationsRepository = authenticationsRepository;
    this.usersRepository = usersRepository;
    this.hashEngine = hashEngine;
    this.tokenManager = tokenManager;
    this.payloadValidator = payloadValidator;
  }

  async execute(useCasePayload) {
    this.payloadValidator.validate('login', useCasePayload);
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
}

module.exports = UserLogin;
