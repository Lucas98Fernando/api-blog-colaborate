const { DataTypes, Model } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        status: DataTypes.INTEGER,
        slug: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "id_author", as: "user" });
    this.belongsTo(models.Category, {
      foreignKey: "id_category",
      as: "category",
    });
  }
}

module.exports = Post;
