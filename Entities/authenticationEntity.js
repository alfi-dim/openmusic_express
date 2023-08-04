class AuthenticationEntity {
  constructor({ refreshToken, accessToken }) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}

module.exports = AuthenticationEntity;
