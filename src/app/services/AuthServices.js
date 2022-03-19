const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const bcrypt = require("bcryptjs");

class AuthServices {
  body = {};

  constructor(body) {
    this.body = body;
  }

  generateJwt(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
      expiresIn: 86400,
    });
  }

  async checkEmail() {
    try {
      const userByEmail = await User.findOne({
        where: { email: this.body.email },
      });
      return userByEmail;
    } catch (error) {
      throw new Error(error);
    }
  }

  async register() {
    try {
      const hasEmail = await this.checkEmail();
      if (hasEmail) return true;
      else {
        await User.create(this.body);
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async login() {
    try {
      const { password } = this.body;
      const user = await this.checkEmail();
      // User don't exists
      if (!user) return 1;
      // Password don't match
      if (!(await bcrypt.compare(password, user.password))) return 2;
      // removing password field from response
      user.password = undefined;
      return { user, token: this.generateJwt({ id: user.id }) };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AuthServices;
