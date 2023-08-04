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

  verifyRefreshToken(payload) {
    return this.jwt.verify(payload, process.env.REFRESH_TOKEN_KEY);
  }
}

module.exports = JwtTokenManager;
