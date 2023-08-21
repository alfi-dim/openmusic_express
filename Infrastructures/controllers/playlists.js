class PlaylistsController {
  constructor(playlistUseCase) {
    this.playlistUseCase = playlistUseCase;
  }

  async addNewPlaylistController(req, res) {
    const useCasePayload = {
      body: req.body,
      token: req.token,
    };
    const result = await this.playlistUseCase.addNewPlaylist(useCasePayload);
    res.status(201).json(result);
  }

  async addSongToPlaylistController(req, res) {
    const { id: playlistId } = req.params;
    const { songId } = req.body;
    const useCasePayload = {
      playlistId,
      songId,
      token: req.token,
    };
    const result = await this.playlistUseCase.addSongToPlaylist(useCasePayload);
    res.json(result);
  }

  async deleteSongFromPlaylistController(req, res) {
    const { id: playlistId } = req.params;
    const { songId } = req.body;
    const useCasePayload = {
      playlistId,
      songId,
      token: req.token,
    };
    const result = await this.playlistUseCase.deleteSongFromPlaylist(useCasePayload);
    res.json(result);
  }

  async updatePlaylistByIdController(req, res) {
    const { id: playlistId } = req.params;
    const useCasePayload = {
      playlistId,
      token: req.token,
      body: req.body,
    };
    const result = await this.playlistUseCase.updatePlaylistById(useCasePayload);
    res.json(result);
  }

  async deletePlaylistByIdController(req, res) {
    const { id: playlistId } = req.params;
    const useCasePayload = {
      playlistId,
      token: req.token,
    };
    const result = await this.playlistUseCase.deletePlaylistById(useCasePayload);
    res.json(result);
  }

  async getPlaylistByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
      token: req.token,
    };
    const result = await this.playlistUseCase.getPlaylistById(useCasePayload);
    res.json(result);
  }
}

module.exports = PlaylistsController;
