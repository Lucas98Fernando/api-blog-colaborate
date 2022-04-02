const PostServices = require("../services/PostServices");
const PostError = require("../errors/HandlerExceptions");

class PostController {
  async create(request, response) {
    try {
      await PostServices.create(request.body, request.file, request.userId);
      return response.status(201).json("Post criado com sucesso!");
    } catch (error) {
      console.log(error);
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
      return response.json(postsByUser);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async getAll(request, response) {
    try {
      const allPosts = await PostServices.getAll();
      return response.json(allPosts);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async getApproved(request, response) {
    try {
      const approvedPosts = await PostServices.getApproved();
      return response.json(approvedPosts);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async getWaitingApproval(request, response) {
    try {
      const waitingApproval = await PostServices.getWaitingApproval();
      return response.json(waitingApproval);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível listar as postagens" });
    }
  }
  async approval(request, response) {
    try {
      await PostServices.approval(request.params);
      return response.json({ message: "Post aprovado com sucesso!" });
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
        request.file,
        request.userId,
        request.id_user_type
      );
      return response.json({ message: "Post atualizado com sucesso!" });
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
