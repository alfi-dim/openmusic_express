const ClientError = require('../exception/ClientError');

const PreResponseHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof ClientError) {
      res.status(err.statusCode).json({ success: false, error: err.message });
    }

    if (err.name === 'ValidationError') {
      // eslint-disable-next-line no-underscore-dangle
      res.status(400).json({ success: false, error: err._message });
    }
    res.status(500).json({ success: false, error: 'server failure' });
  }

  next();
};

module.exports = PreResponseHandler;
