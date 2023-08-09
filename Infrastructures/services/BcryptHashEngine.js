const HashEngine = require('../../Interfaces/contracts/services/HashEngine');
const AuthenticationError = require('../../Exceptions/AuthenticationError');

class BcryptHashEngine extends HashEngine {
  constructor(bcrypt, saltRound = 10) {
    super();
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }

  async hash(password) {
    return this.bcrypt.hash(password, this.saltRound);
  }

  async comparePassword(password, hashedPassword) {
    const result = await this.bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError('Wrong password');
    }
  }
}

module.exports = BcryptHashEngine;
