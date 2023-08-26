class SongsController {
  constructor(SongsUseCase) {
    this.songUseCase = SongsUseCase;
  }

  async addNewSongController(req, res) {
    const useCasePayload = req.body;
    const result = await this.songUseCase.addNewSong(useCasePayload);
    res.status(201).json(result);
  }

  async getAllSongController(res) {
    const result = await this.songUseCase.getAllSong();
    res.json(result);
  }

  async getSongByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
    };
    const result = await this.songUseCase.getSongById(useCasePayload);
    res.json(result);
  }

  async updateSongByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
      body: req.body,
    };
    const result = await this.songUseCase.updateSongById(useCasePayload);
    res.json(result);
  }

  async deleteSongByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
    };
    const result = await this.songUseCase.deleteSongById(useCasePayload);
    res.json(result);
  }
}

module.exports = SongsController;
