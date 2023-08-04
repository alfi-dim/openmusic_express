const AuthenticationError = require('../../exception/AuthenticationError');

class BcryptHashEngine {
  constructor(bcrypt, saltRound = 10) {
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
