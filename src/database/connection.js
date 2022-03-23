const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig);

(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.info("Conexão estabelecida!");
  } catch (error) {
    console.error(`Ocorreu um erro ${error}`);
  }
})();

module.exports = { Sequelize, sequelize };
