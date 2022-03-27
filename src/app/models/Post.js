const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../database/connection");
const Category = require("./Category");

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
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasOne(Post, { foreignKey: "idCategory" });
Post.belongsTo(Category, { foreignKey: "idCategory" });

// Post.sync({force: true});

module.exports = Post;
