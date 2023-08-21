class AuthenticationsController {
  constructor(authenticationsUseCase) {
    this.authenticationsUseCase = authenticationsUseCase;
  }

  async loginController(req, res) {
    const useCasePayload = req.body;
    const result = await this.authenticationsUseCase.login(useCasePayload);
    res.status(201).json(result);
  }

  async logoutController(req, res) {
    const useCasePayload = req.body;
    const result = await this.authenticationsUseCase.logout(useCasePayload);
    res.json(result);
  }

  async refreshAccessTokenController(req, res) {
    const useCasePayload = req.body;
    const result = await this.authenticationsUseCase.refreshAccessToken(useCasePayload);
    res.json(result);
  }
}

module.exports = AuthenticationsController;
