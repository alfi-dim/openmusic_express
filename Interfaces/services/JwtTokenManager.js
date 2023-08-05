const InvariantError = require('../../exception/InvariantError');

class JwtTokenManager {
  constructor(jwt) {
    this.jwt = jwt;
  }

  generateAccessToken(payload) {
    return this.jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: process.env.TOKEN_AGE },
    );
  }

  generateRefreshToken(payload) {
    return this.jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_KEY,
    );
  }

  async verifyRefreshToken(token) {
    const artifacts = await this.jwt.decode(token);
    await this.jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY)
      .catch(() => new InvariantError('Token is invalid'));
  }

  async verifyAccessToken(token) {
    const artifacts = await this.jwt.decode(token);
    await this.jwt.verify(artifacts, process.env.ACCESS_TOKEN_KEY)
      .catch(() => new InvariantError('Token is invalid'));
  }

  async decodePayload(token) {
    const artifacts = await this.jwt.decode(token);
    return artifacts.decode.payload;
  }
}

module.exports = JwtTokenManager;
