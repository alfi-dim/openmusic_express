class AlbumsController {
  constructor(AlbumUseCase) {
    this.albumUseCase = AlbumUseCase;
  }

  async addNewAlbumController(req, res) {
    const useCasePayload = req.body;
    const result = await this.albumUseCase.addNewAlbum(useCasePayload);
    res.status(201).json(result);
  }

  async getAllAlbumController(req, res) {
    const result = await this.albumUseCase.getAllAlbum();
    res.json(result);
  }

  async getAlbumByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
    };
    const result = await this.albumUseCase.getAlbumById(useCasePayload);
    res.json(result);
  }

  async updateAlbumByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
      body: req.body,
    };
    const result = await this.albumUseCase.updateAlbumById(useCasePayload);
    res.json(result);
  }

  async deleteAlbumByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      id,
    };
    const result = await this.albumUseCase.deleteAlbumById(useCasePayload);
    res.json(result);
  }
}

module.exports = AlbumsController;
