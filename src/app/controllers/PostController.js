const PostServices = require("@services/PostServices");
const PostError = require("@errors/HandlerExceptions");

class PostController {
  async create(request, response) {
    try {
      await PostServices.create(request.body, request.userId);
      return response.status(201).json("Post criado com sucesso!");
    } catch (error) {
      if (error instanceof PostError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível cadastrar o post" });
    }
  }
  async getByUser(request, response) {
    try {
      const postsByUser = await PostServices.getByUser(request.userId);
      return response.status(200).json(postsByUser);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async getAll(request, response) {
    try {
      const allPosts = await PostServices.getAll();
      return response.status(200).json(allPosts);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async getApproved(request, response) {
    try {
      const approvedPosts = await PostServices.getApproved();
      return response.status(200).json(approvedPosts);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async getWaitingApproval(request, response) {
    try {
      const waitingApproval = await PostServices.getWaitingApproval();
      return response.status(200).json(waitingApproval);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async approval(request, response) {
    try {
      await PostServices.approval(request.params);
      return response
        .status(200)
        .json({ message: "Post aprovado com sucesso!" });
    } catch (error) {
      if (error instanceof PostError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível aprovar a postagem" });
    }
  }
  async update(request, response) {
    try {
      await PostServices.update(
        request.params,
        request.body,
        request.userId,
        request.idUserType
      );
      return response
        .status(200)
        .json({ message: "Post atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      if (error instanceof PostError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível atualizar a postagem" });
    }
  }
}

module.exports = new PostController();
