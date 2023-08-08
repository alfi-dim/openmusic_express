const express = require('express');
const { container } = require('../../../container');

const router = express.Router();

const playlistsController = container.PlaylistsController;

router.post('/playlists', (req, res, next) => {
  playlistsController.addNewPlaylistController(req, res)
    .catch((err) => next(err));
});
router.patch('/playlists/:id/songs', (req, res, next) => {
  playlistsController.addSongToPlaylistController(req, res)
    .catch((err) => next(err));
});
router.delete('/playlists/:id/songs', (req, res, next) => {
  playlistsController.deleteSongFromPlaylistController(req, res)
    .catch((err) => next(err));
});
router.patch('/playlists/:id', (req, res, next) => {
  playlistsController.updatePlaylistByIdController(req, res)
    .catch((err) => next(err));
});
router.delete('/playlists/:id', (req, res, next) => {
  playlistsController.deletePlaylistByIdController(req, res)
    .catch((err) => next(err));
});
router.get('/playlists/:id', (req, res, next) => {
  playlistsController.getPlaylistByIdController(req, res)
    .catch((err) => next(err));
});
module.exports = router;
