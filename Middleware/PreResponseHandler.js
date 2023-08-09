const ClientError = require('../Exceptions/ClientError');

const PreResponseHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof ClientError) {
      return res.status(err.statusCode).json({ success: false, error: err.message });
    }

    if (err.name === 'ValidationError') {
      // eslint-disable-next-line no-underscore-dangle
      return res.status(400).json({ success: false, error: err._message });
    }
    return res.status(500).json({ success: false, error: 'server failure' });
  }
  return next();
};

module.exports = PreResponseHandler;
