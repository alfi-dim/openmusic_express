class AlbumsController {
  constructor(AlbumUseCase) {
    this.albumUseCase = AlbumUseCase;
  }

  async addNewAlbumController(req, res) {
    const useCasePayload = req.body;
    const result = await this.albumUseCase.addNewAlbumUseCase(useCasePayload);
    res.json(result).status(201);
  }

  async getAllAlbumController(req, res) {
    const result = await this.albumUseCase.getAllAlbumUseCase();
    res.json(result);
  }

  async getAlbumByIdController(req, res) {
    const { id } = req.params;
    const result = await this.albumUseCase.getAlbumByIdUseCase(id);
    res.json(result);
  }

  async updateAlbumByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = req.body;
    const result = await this.albumUseCase.updateAlbumByIdUseCase(id, useCasePayload);
    res.json(result);
  }

  async deleteAlbumByIdController(req, res) {
    const { id } = req.params;
    const result = await this.albumUseCase.deleteAlbumByIdUseCase(id);
    res.json(result);
  }
}

module.exports = AlbumsController;
