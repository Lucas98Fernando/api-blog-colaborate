const PostServices = require("../services/PostServices");
const PostError = require("../errors/PostExceptions");

class PostController {
  async createPost(request, response) {
    try {
      await PostServices.create(request.body, request.userId);
      return response.status(200).json("Post criado com sucesso!");
    } catch (error) {
      if (error instanceof PostError)
        return response.status(error.status).json({ error: error.message });
      else
        return response
          .status(400)
          .json({ error: "Não foi possível cadastrar o post" });
    }
  }
}

module.exports = new PostController();
