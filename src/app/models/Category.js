const { DataTypes, Model } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.hasOne(models.Post, {
      foreignKey: "id_category",
      as: "post",
    });
  }
}

module.exports = Category;
