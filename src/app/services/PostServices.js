const Post = require("../models/Post");

class PostServices {
  async create(body, userId) {
    try {
      await Post.create({ ...body, idAuthor: userId });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new PostServices();
