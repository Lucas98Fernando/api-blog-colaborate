const Post = require("../models/Post");

class PostServices {
  async create(body) {
    try {
      await Post.create(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new PostServices();
