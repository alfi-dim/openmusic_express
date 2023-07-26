const express = require('express');
const { container } = require('../../../container');

const router = express.Router();

const albumsController = container.AlbumsController;

router.get('/albums', (req, res, next) => {
  albumsController.getAllAlbumController(req, res)
    .catch((err) => next(err));
});
router.get('/albums/:id', (req, res, next) => {
  albumsController.getAlbumByIdController(req, res)
    .catch((err) => next(err));
});
router.post('/albums', (req, res, next) => {
  albumsController.addNewAlbumController(req, res)
    .catch((err) => next(err));
});
router.put('/albums/:id', (req, res, next) => {
  albumsController.updateAlbumByIdController(req, res)
    .catch((err) => next(err));
});
router.delete('/albums/:id', (req, res, next) => {
  albumsController.deleteAlbumByIdController(req, res)
    .catch((err) => next(err));
});

module.exports = router;
