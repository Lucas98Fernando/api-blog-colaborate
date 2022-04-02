const Category = require("../models/Category");
const CategoryError = require("../errors/HandlerExceptions");

class CategoryServices {
  async checkExistence(body) {
    try {
      const category = await Category.findOne({ where: { name: body.name } });
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findCategory(idCategory) {
    try {
      const category = await Category.findOne({ where: { id: idCategory } });
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
  async getAll() {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name", "slug"],
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }
  async update(params, body) {
    try {
      const { id_category } = params;
      const { name, slug } = body;
      const category = await this.findCategory(id_category);
      if (category === null)
        throw new CategoryError("Categoria não encontrada!");
      if (!name || !slug) throw new CategoryError("Existem campos inválidos!");
      else {
        category.update({ name, slug });
        await category.save();
      }
    } catch (error) {
      throw error;
    }
  }
  async delete(params) {
    try {
      const { id_category } = params;
      const category = await this.findCategory(id_category);
      if (category === null)
        throw new CategoryError("Categoria não encontrada!");
      else await category.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryServices();
