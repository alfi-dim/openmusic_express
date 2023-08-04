const express = require('express');
const { container } = require('../../../container');

const router = express.Router();

const authenticationsController = container.AuthenticationsController;

router.post('/authentications', (req, res, next) => {
  authenticationsController.loginController(req, res)
    .catch((err) => next(err));
});

router.delete('/authentications', (req, res, next) => {
  authenticationsController.logoutController(req, res)
    .catch((err) => next(err));
});

module.exports = router;
