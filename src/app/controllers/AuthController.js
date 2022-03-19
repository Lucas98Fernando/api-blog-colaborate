const AuthServices = require("../services/AuthServices");
const AuthError = require("../errors/AuthExcepetions");

class AuthController {
  async Register(request, response) {
    try {
      const body = request.body;
      const user = new AuthServices(body);
      await user.register(body);
      return response.status(200).json("Usuário cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof AuthError) return response.status(400).json(error);
      else
        return response
          .status(400)
          .json("Não foi possível cadastrar o usuário");
    }
  }

  async Login(request, response) {
    try {
      const body = request.body;
      const user = new AuthServices(body);
      const checkLogin = await user.login();
      if (checkLogin === 1)
        response.status(400).json("Usuário não encontrado!");
      else if (checkLogin === 2)
        response.status(401).json("E-mail ou senha incorretos");
      else response.status(200).json(checkLogin);
    } catch (error) {
      response.status(400).json("Não foi possível realizar o login");
    }
  }
}

module.exports = new AuthController();
