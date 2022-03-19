const PostServices = require("../services/PostServices");

class PostController {
  async CreatePost(request, response) {
    try {
      const body = request.body;
      const post = new PostServices(body);
      await post.createPost();
      response.status(200).json("Post criado com sucesso!");
    } catch (error) {
      response.status(400).json("Não foi possível cadastrar o post");
      console.log(error);
    }
  }
}

module.exports = new PostController();
