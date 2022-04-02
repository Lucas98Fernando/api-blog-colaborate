const Sequelize = require("sequelize");
const dbConfig = require("../config/db");
const Post = require("../app/models/Post");
const User = require("../app/models/User");
const Category = require("../app/models/Category");

const connection = new Sequelize(dbConfig);

(async () => {
  try {
    await connection.authenticate();
    console.info("Conexão estabelecida!");
  } catch (error) {
    console.error(`Ocorreu um erro ${error}`);
  }
})();

Post.init(connection);
User.init(connection);
Category.init(connection);

Post.associate(connection.models);
User.associate(connection.models);
Category.associate(connection.models);

module.exports = connection;
