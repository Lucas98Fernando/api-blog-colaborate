const AuthServices = require("../services/AuthServices");
const AuthError = require("../errors/AuthExceptions");

class AuthController {
  async register(request, response) {
    try {
      await AuthServices.register(request.body);
      return response.status(200).json("Usuário cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof AuthError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json("Não foi possível cadastrar o usuário");
    }
  }
  async login(request, response) {
    try {
      const userData = await AuthServices.login(request.body);
      return response.status(200).json(userData);
    } catch (error) {
      if (error instanceof AuthError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível realizar o login" });
    }
  }
}

module.exports = new AuthController();
