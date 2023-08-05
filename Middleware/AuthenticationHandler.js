const AuthorizationError = require('../exception/AuthorizationError');

const AuthenticationHandler = (req, res, next) => {
  const { originalUrl } = req;
  if (!originalUrl.startsWith('/users')) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthorizationError('Request declined, need authentication token');
    }

    const accessToken = authHeader.split(' ')[1];
    req.token = accessToken;
  }
  next();
};

module.exports = AuthenticationHandler;
