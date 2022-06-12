const User = require("../models/User");
const AuthError = require("../errors/HandlerExceptions");
const authConfig = require("../../config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
const mailer = require("../../email/mailer");

class AuthServices {
  generateJwt(params = {}, expiresIn = "24h") {
    return jwt.sign({ params }, authConfig.secret, {
      expiresIn: expiresIn,
    });
  }

  isAdmin(idUserType) {
    return idUserType === 1;
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
      const { name, email, password } = body;
      const hasEmail = await this.checkEmail(email);

      if (hasEmail) throw new AuthError("E-mail já cadastrado!");
      if (!name || !email || !password)
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
        const { id, id_user_type, name, email } = user;
        return {
          user: {
            id_user_type,
            name,
            email,
          },
          token: this.generateJwt({ id, id_user_type }),
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
        // const token = crypto.randomBytes(20).toString("hex");
        const token = this.generateJwt({ email }, "1h");
        const currentDate = new Date();

        currentDate.setHours(currentDate.getHours() + 1);

        user.update({
          token_recover_account: token,
          time_token_recover_account: currentDate,
          token_times_used: 0,
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
        from: "blog-colaborate@hotmail.com",
        subject: "Recuperação de conta",
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

  async recoverAccountValidateToken(email) {
    try {
      const user = await this.checkEmail(email);
      if (user.token_times_used > 0)
        throw new AuthError("Token já utilizado! Solicite um novo");
    } catch (error) {
      throw error;
    }
  }

  async recoverAccount(body) {
    try {
      const { token, email, password } = body;
      const user = await this.checkEmail(email);
      const currentDate = new Date();

      if (!user) throw new AuthError("Usuário não encontrado");
      if (!token || !email || !password)
        throw new AuthError("Existem campos inválidos");
      if (token !== user.token_recover_account)
        throw new AuthError("Token inválido!");
      if (user.token_times_used > 0)
        throw new AuthError("Token já utilizado! Solicite um novo");
      if (currentDate > user.time_token_recover_account)
        throw new AuthError("O token expirou!");
      else {
        user.set({
          password: password,
          token_times_used: 1,
        });
        await user.save();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthServices();
