const Post = require("../models/Post");
const PostError = require("../errors/PostExceptions");
const CategoryServices = require("../services/CategoryServices");
const postAttributes = require("../../helpers/attributes/postAttributes");

class PostServices {
  /*
    Posts status description:
    1 = Post waiting approval
    2 = Post approved
  */
  async create(body, userId) {
    try {
      const { title, description, idCategory } = body;
      const categoryExists = await CategoryServices.findCategory(idCategory);
      if (categoryExists === null)
        throw new PostError("A categoria informada na postagem não existe");
      if (!title || !description || !idCategory)
        throw new PostError("Existem campos inválidos");
      else await Post.create({ ...body, idAuthor: userId });
    } catch (error) {
      throw error;
    }
  }
  async getByUser(userId) {
    try {
      const posts = await Post.findAll({
        where: { idAuthor: userId },
        attributes: postAttributes,
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const allPosts = await Post.findAll({
        attributes: postAttributes,
      });
      return allPosts;
    } catch (error) {
      throw error;
    }
  }
  async getApproved() {
    try {
      const approvedPosts = await Post.findAll({
        where: { status: 2 },
        attributes: postAttributes,
      });
      return approvedPosts;
    } catch (error) {
      throw error;
    }
  }
  async getWaitingApproval() {
    try {
      const waitingApproval = await Post.findAll({
        where: { status: 1 },
        attributes: postAttributes,
      });
      return waitingApproval;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostServices();
