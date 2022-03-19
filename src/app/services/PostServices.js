const Post = require("../models/Post");

class PostServices {
  body = {};

  constructor(body) {
    this.body = body;
  }

  async createPost() {
    try {
      await Post.create(this.body);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PostServices;
