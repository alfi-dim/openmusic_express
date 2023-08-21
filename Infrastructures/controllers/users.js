class UsersController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  async createNewUserController(req, res) {
    const useCasePayload = req.body;
    const result = await this.userUseCase.createNewUser(useCasePayload);
    res.status(201).json(result);
  }

  async verifyIfUsernameIsAvailableController(req, res) {
    const { username } = req.params;
    const useCasePayload = {
      username,
    };
    const result = await this.userUseCase.verifyIfUsernameIsAvailable(useCasePayload);
    res.json(result);
  }

  async getUserByIdController(req, res) {
    const { id } = req.params;
    const useCasePayload = {
      userId: id,
    };
    const result = await this.userUseCase.getUserById(useCasePayload);
    res.json(result);
  }
}

module.exports = UsersController;
