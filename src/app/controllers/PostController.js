const PostServices = require("../services/PostServices");

const PostController = {
  async CreatePost(request, response) {
    try {
      const body = request.body;
      const post = new PostServices(body);
      await post.createPost();
      response.status(200).send("Post criado com sucesso!");
    } catch (error) {
      response.status(400).send("Não foi possível cadastrar o post");
      console.log(error);
    }
  },
};

module.exports = PostController;
