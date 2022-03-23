const User = require("../models/User");
const AuthError = require("../errors/HandlerExceptions");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const bcrypt = require("bcryptjs");

class AuthServices {
  generateJwt(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
      expiresIn: "24h",
    });
  }
  async checkEmail(email) {
    try {
      const userByEmail = await User.findOne({
        where: { email: email },
      });
      return userByEmail;
    } catch (error) {
      throw new Error(error);
    }
  }
  async register(body) {
    try {
      const { name, idUserType, email, password } = body;
      const hasEmail = await this.checkEmail(email);
      if (hasEmail) throw new AuthError("E-mail já cadastrado!");
      if (!name || !idUserType || !email || !password)
        throw new AuthError("Existem campos inválidos");
      if (password.length < 6)
        throw new AuthError("A senha deve conter no mínimo 6 caracteres");
      else await User.create(body);
    } catch (error) {
      throw error;
    }
  }
  async login(body) {
    try {
      const { email, password } = body;
      const user = await this.checkEmail(email);
      if (!user) throw new AuthError("Usuário não encontrado");
      if (!(await bcrypt.compare(password, user.password)))
        throw new AuthError("E-mail ou senha incorretos", 401);
      else {
        const { id, idUserType, name, email } = user;
        return {
          user: {
            idUserType,
            name,
            email,
          },
          token: this.generateJwt({ id, idUserType }),
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthServices();
