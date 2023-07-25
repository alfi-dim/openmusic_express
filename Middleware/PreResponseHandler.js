const ClientError = require('../exception/ClientError');

const PreResponseHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({ success: false, error: err.message });
  }
  next();
};

module.exports = PreResponseHandler;
