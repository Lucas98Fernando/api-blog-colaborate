const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../database/connection");

const Category = db.sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Category.sync({ alter: true });

module.exports = Category;
