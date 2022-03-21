const CategoryServices = require("../services/CategoryServices");
const CategoryError = require("../errors/CategoryExceptions");

class CategoryController {
  async create(request, response) {
    try {
      await CategoryServices.create(request.body);
      return response.status(200).json("Categoria cadastrada com sucesso!");
    } catch (error) {
      if (error instanceof CategoryError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível criar a categoria" });
    }
  }
  async getAll(request, response) {
    try {
      const categories = await CategoryServices.getAll();
      return response.status(200).json(categories);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as categorias" });
    }
  }
}

module.exports = new CategoryController();
