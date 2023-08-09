class PlaylistsController {
  constructor(playlistUseCase) {
    this.playlistUseCase = playlistUseCase;
  }

  async addNewPlaylistController(req, res) {
    const useCasePayload = req.body;
    useCasePayload.token = req.token;
    const result = await this.playlistUseCase.addNewPlaylistUseCase(useCasePayload);
    res.json(result).status(201);
  }

  async addSongToPlaylistController(req, res) {
    const { id: playlistId } = req.params;
    const { songId } = req.body;
    const useCasePayload = {
      playlistId,
      songId,
      token: req.token,
    };
    const result = await this.playlistUseCase.addSongToPlaylistUseCase(useCasePayload);
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
    const result = await this.playlistUseCase.deleteSongFromPlaylistUseCase(useCasePayload);
    res.json(result);
  }

  async updatePlaylistByIdController(req, res) {
    const { id: playlistId } = req.params;
    const useCasePayload = {
      playlistId,
      token: req.token,
      payload: req.body,
    };
    const result = await this.playlistUseCase.updatePlaylistByIdUseCase(useCasePayload);
    res.json(result);
  }

  async deletePlaylistByIdController(req, res) {
    const { id: playlistId } = req.params;
    const useCasePayload = {
      playlistId,
      token: req.token,
    };
    const result = await this.playlistUseCase.deletePlaylistByIdUseCase(useCasePayload);
    res.json(result);
  }

  async getPlaylistByIdController(req, res) {
    const { id: playlistId } = req.params;
    const result = await this.playlistUseCase.getPlaylistByIdUseCase(playlistId);
    res.json(result);
  }
}

module.exports = PlaylistsController;
