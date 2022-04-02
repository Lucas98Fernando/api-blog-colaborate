const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user_type: DataTypes.INTEGER,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        token_recover_account: DataTypes.STRING,
        time_token_recover_account: DataTypes.DATE,
        token_times_used: DataTypes.INTEGER,
      },
      {
        sequelize,
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
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: "id_author", as: "posts" });
  }
}

module.exports = User;
