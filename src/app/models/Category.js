const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../database/connection");

const Category = db.sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.sync({ alter: true });

module.exports = Category;
