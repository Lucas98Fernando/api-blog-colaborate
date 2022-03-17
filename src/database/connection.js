const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig);

sequelize
  .authenticate()
  .then(() => console.info("Conexão estabelecida!"))
  .catch((error) => console.error(`Ocorreu um erro ${error}`));

module.exports = sequelize;
