const User = require("../models/User");

const UserController = {
  async CreateUser(request, response) {
    const user = request.body;
    try {
      const hasEmail = await User.findOne({ where: { email: user.email } });
      if (hasEmail) response.status(400).send("E-mail já cadastrado!");
      else {
        await User.create(user);
        response.status(200).send("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      response.status(400).send("Não foi possível cadastrar o usuário");
      console.log(error);
    }
  },
};

module.exports = UserController;
