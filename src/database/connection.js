const Sequelize = require("sequelize");
const dbConfig = require("../config/db");
const Post = require("../app/models/Post");
const User = require("../app/models/User");
const Category = require("../app/models/Category");

const currentEnvironment = process.env.NODE_ENV;

const connection = new Sequelize(dbConfig[currentEnvironment]);

(async () => {
  try {
    await connection.authenticate();
    console.info("Conexão estabelecida!");
  } catch (error) {
    console.error(`Ocorreu um erro ${error}`);
  }
})();

const models = [Post, User, Category];

for (let i in models) {
  models[i].init(connection);
}

for (let i in models) {
  models[i].associate(connection.models);
}

module.exports = connection;
