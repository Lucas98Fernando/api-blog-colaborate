const User = require("@models/User");
const AuthError = require("@errors/HandlerExceptions");
const authConfig = require("@config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailer = require("@/email/mailer");

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
  async forgotPassword(body) {
    try {
      const { email } = body;
      const user = await this.checkEmail(email);

      if (!user) throw new AuthError("Usuário não encontrado");
      else {
        const token = crypto.randomBytes(20).toString("hex");
        const currentDate = new Date();

        currentDate.setHours(currentDate.getHours() + 1);

        user.update({
          tokenRecoverAccount: token,
          timeTokenRecoverAccount: currentDate,
        });
        await user.save();

        this.sendRecoverAccountEmail(email, token);
      }
    } catch (error) {
      throw error;
    }
  }
  sendRecoverAccountEmail(email, token) {
    mailer.sendMail(
      {
        to: email,
        from: "lucas98fernando@gmail.com",
        template: "RecoverAccount",
        context: {
          token,
        },
      },
      (error) => {
        if (error) throw new AuthError("Não foi possível enviar o e-mail");
      }
    );
  }
  async recoverAccount(body) {
    try {
      const { token, email, password } = body;
      const user = await this.checkEmail(email);

      if (!user) throw new AuthError("Usuário não encontrado");
      if (!token || !email || !password)
        throw new AuthError("Existem campos inválidos");
      if (token !== user.tokenRecoverAccount)
        throw new AuthError("Token inválido!");

      const currentDate = new Date();

      if (currentDate > user.timeTokenRecoverAccount)
        throw new AuthError("O token expirou!");
      else {
        user.update({
          password: password,
        });
        await user.save();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthServices();
