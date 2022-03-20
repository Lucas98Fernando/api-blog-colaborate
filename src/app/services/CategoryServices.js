const Category = require("../models/Category");
const CategoryError = require("../errors/CategoryExceptions");

class CategoryServices {
  async checkExistence(body) {
    try {
      const category = await Category.findOne({ where: { name: body.name } });
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(body) {
    try {
      const { name, slug } = body;
      const category = await this.checkExistence(body);
      if (category) throw new CategoryError("Categoria já cadastrada");
      if (!name || !slug) throw new CategoryError("Existem campos inválidos!");
      else await Category.create(body);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryServices();
