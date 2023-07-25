const express = require('express');
const { container } = require('../../../container');

const router = express.Router();

const songsController = container.SongsController;

router.get('/songs', (req, res, next) => {
  songsController.getAllSongController(res)
    .catch((err) => next(err));
});
router.get('/songs/:id', (req, res, next) => {
  songsController.getSongByIdController(req, res)
    .catch((err) => next(err));
});
router.post('/songs', (req, res, next) => {
  songsController.addNewSongController(req, res)
    .catch((err) => next(err));
});
router.put('/songs/:id', (req, res, next) => {
  songsController.updateSongByIdController(req, res)
    .catch((err) => next(err));
});
router.delete('/songs/:id', (req, res, next) => {
  songsController.deleteSongByIdController(req, res)
    .catch((err) => next(err));
});

module.exports = router;
