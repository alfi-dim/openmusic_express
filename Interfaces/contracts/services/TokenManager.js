/* eslint-disable no-unused-vars,class-methods-use-this */

class TokenManager {
  generateAccessToken(payload) {
    throw new Error('Method not yet implemented');
  }

  generateRefreshToken(payload) {
    throw new Error('Method not yet implemented');
  }

  async verifyRefreshToken(token) {
    throw new Error('Method not yet implemented');
  }

  async verifyAccessToken(token) {
    throw new Error('Method not yet implemented');
  }

  decodePayload(token) {
    throw new Error('Method not yet implemented');
  }
}

module.exports = TokenManager;
