const express = require('express');
const { container } = require('../../../container');

const router = express.Router();
const usersController = container.UsersController;

router.post('/users', (req, res, next) => {
  usersController.createNewUserController(req, res)
    .catch((err) => next(err));
});

router.get('/users/check-username/:username', (req, res, next) => {
  usersController.verifyIfUsernameIsAvailableController(req, res)
    .catch((err) => next(err));
});

module.exports = router;
