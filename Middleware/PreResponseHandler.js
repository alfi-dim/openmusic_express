const ClientError = require('../Exceptions/ClientError');

const PreResponseHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof ClientError) {
      return res.status(err.statusCode).json({ status: 'fail', message: err.message });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({ status: 'fail', message: err.message });
    }
    return res.status(500).json({ status: 'fail', message: 'server failure' });
  }
  return next();
};

module.exports = PreResponseHandler;
