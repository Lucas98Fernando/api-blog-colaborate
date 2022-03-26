const CategoryServices = require("@services/CategoryServices");
const CategoryError = require("@errors/HandlerExceptions");

class CategoryController {
  async create(request, response) {
    try {
      await CategoryServices.create(request.body);
      return response
        .status(201)
        .json({ message: "Categoria cadastrada com sucesso!" });
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
  async update(request, response) {
    try {
      await CategoryServices.update(request.params, request.body);
      return response
        .status(200)
        .json({ message: "Categoria atualizada com sucesso!" });
    } catch (error) {
      if (error instanceof CategoryError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possivel atualizar a categoria" });
    }
  }
  async delete(request, response) {
    try {
      await CategoryServices.delete(request.params);
      return response
        .status(200)
        .json({ message: "Categoria excluída com sucesso!" });
    } catch (error) {
      if (error instanceof CategoryError)
        return response.status(error.status).json({ error: error.message });
      return response
        .status(400)
        .json({ error: "Não foi possível excluir a categoria" });
    }
  }
}

module.exports = new CategoryController();
