const AuthServices = require("../services/AuthServices");

const AuthController = {
  async Register(request, response) {
    try {
      const body = request.body;
      const user = new AuthServices(body);
      const checkEmail = await user.register();
      // Check if e-mail already exists
      if (checkEmail) response.status(400).send("E-mail já cadastrado!");
      else response.status(200).send("Usuário cadastrado com sucesso!");
    } catch (error) {
      response.status(400).send("Não foi possível cadastrar o usuário");
    }
  },
  async Login(request, response) {
    try {
      const body = request.body;
      const user = new AuthServices(body);
      const checkLogin = await user.login();
      if (checkLogin === 1)
        response.status(400).send("Usuário não encontrado!");
      else if (checkLogin === 2)
        response.status(401).send("E-mail ou senha incorretos");
      else response.status(200).send(checkLogin);
    } catch (error) {
      response.status(400).send("Não foi possível realizar o login");
    }
  },
};

module.exports = AuthController;
