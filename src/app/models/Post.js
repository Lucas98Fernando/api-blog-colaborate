const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../database/connection");
const category = require("./Category");

const Post = db.sequelize.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idAuthor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Post.sync({ force: true });

module.exports = Post;
