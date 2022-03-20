const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../database/connection");
const bcrypt = require("bcryptjs");
const post = require("./Post");

const User = db.sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUserType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  }
);

User.hasMany(post, {
  foreignKey: "idAuthor",
});

// User.sync({ force: true });

module.exports = User;
