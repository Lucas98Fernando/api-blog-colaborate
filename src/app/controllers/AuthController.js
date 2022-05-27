const AuthServices = require("../services/AuthServices");
const AuthError = require("../errors/HandlerExceptions");

class AuthController {
  async register(request, response) {
    try {
      await AuthServices.register(request.body);
      return response
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!" });
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
      return response.json(userData);
    } catch (error) {
      if (error instanceof AuthError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível realizar o login" });
    }
  }

  async forgotPassword(request, response) {
    try {
      await AuthServices.forgotPassword(request.body);
      return response.json();
    } catch (error) {
      if (error instanceof AuthError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível enviar o e-mail" });
    }
  }

  async recoverAccountValidateToken(request, response) {
    try {
      const userEmail = request.email_recover_account;
      await AuthServices.recoverAccountValidateToken(userEmail);
      return response.json({ email: userEmail });
    } catch {
      return response
        .status(403)
        .json({ error: "Token inválido para utilização" });
    }
  }

  async recoverAccount(request, response) {
    try {
      await AuthServices.recoverAccount(request.body);
      return response.json();
    } catch (error) {
      if (error instanceof AuthError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível recuperar a conta" });
    }
  }
}

module.exports = new AuthController();
