const User = require("../models/User");
const AuthError = require("../errors/AuthExcepetions");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const bcrypt = require("bcryptjs");

class AuthServices {
  generateJwt(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
      expiresIn: 86400,
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
      const { email } = body;
      const hasEmail = await this.checkEmail(email);
      if (hasEmail) throw new AuthError("E-mail já cadastrado!");
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
        return {
          user: {
            idUserType: user.idUserType,
            name: user.name,
            email: user.email,
          },
          token: this.generateJwt({ id: user.id }),
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthServices();
