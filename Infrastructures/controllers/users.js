class UsersController {
  constructor(userUsecase) {
    this.userUseCase = userUsecase;
  }

  async createNewUserController(req, res) {
    const useCasePayload = req.body;
    const result = await this.userUseCase.createNewUserUseCase(useCasePayload);
    res.json(result).status(201);
  }

  async verifyIfUsernameIsAvailableController(req, res) {
    const { username } = req.params;
    const result = await this.userUseCase.verifyIfUsernameIsAvailableUseCase(username);
    res.json(result);
  }

  async getUserByIdController(req, res) {
    const { id } = req.params;
    const result = await this.userUseCase.getUserByIdUseCase(id);
    res.json(result);
  }
}

module.exports = UsersController;
