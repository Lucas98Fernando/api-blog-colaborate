const PostServices = require("../services/PostServices");

class PostController {
  async createPost(request, response) {
    try {
      await PostServices.create(request.body, request.userId);
      response.status(200).json("Post criado com sucesso!");
    } catch (error) {
      response.status(400).json("Não foi possível cadastrar o post");
      console.log(error);
    }
  }
}

module.exports = new PostController();
