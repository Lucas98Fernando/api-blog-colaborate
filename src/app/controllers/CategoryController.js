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
}

module.exports = new CategoryController();
