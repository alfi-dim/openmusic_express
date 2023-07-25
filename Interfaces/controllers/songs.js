class SongsController {
  constructor(SongsUseCase) {
    this.songUseCase = SongsUseCase;
  }

  async addNewSongController(req, res) {
    const useCasePayload = req.body;
    const result = await this.songUseCase.addNewSongUseCase(useCasePayload);
    res.json(result).status(201);
  }

  async getAllSongController(res) {
    const result = await this.songUseCase.getAllSongUseCase();
    res.json(result);
  }

  async getSongByIdController(req, res) {
    const { id } = req.params;
    const result = await this.songUseCase.getSongByIdUseCase(id);
    res.json(result);
  }

  async updateSongByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = req.body;
    const result = await this.songUseCase.updateSongByIdUseCase(id, useCasePayload);
    res.json(result);
  }

  async deleteSongByIdController(req, res) {
    const { id } = req.params;
    const result = await this.songUseCase.deleteSongByIdUseCase(id);
    res.json(result);
  }
}

module.exports = SongsController;
