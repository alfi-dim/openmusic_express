const InvariantError = require('../../exception/InvariantError');

class JwtTokenManager {
  constructor(jwt) {
    this.jwt = jwt;
  }

  generateAccessToken(payload) {
    return this.jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: parseInt(process.env.TOKEN_AGE, 10) },
    );
  }

  generateRefreshToken(payload) {
    return this.jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_KEY,
    );
  }

  async verifyRefreshToken(token) {
    await this.jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (err) => {
      if (err) {
        throw new InvariantError('Token is invalid');
      }
    });
  }

  async verifyAccessToken(token) {
    await this.jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err) => {
      if (err) {
        throw new InvariantError('Token is invalid');
      }
    });
  }

  decodePayload(token) {
    return this.jwt.decode(token);
  }
}

module.exports = JwtTokenManager;
