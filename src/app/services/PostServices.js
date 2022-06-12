const Post = require("../models/Post");
const PostError = require("../errors/HandlerExceptions");
const CategoryServices = require("../services/CategoryServices");
const postAttributes = require("../../helpers/attributes/postAttributes");
const Category = require("../models/Category");
const User = require("../models/User");

class PostServices {
  /*
    Posts status description:
    1 = Post waiting approval
    2 = Post approved
  */

  async checkPostExists(params) {
    try {
      const { idPost } = params;
      const post = await Post.findOne({ where: { id: idPost } });
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(body, file, userId) {
    try {
      const { title, description, slug, id_category } = body;
      const categoryExists = await CategoryServices.findCategory(id_category);
      if (categoryExists === null)
        throw new PostError("A categoria informada na postagem não existe");
      if (!title || !description || !slug || !id_category)
        throw new PostError("Existem campos inválidos");
      else await Post.create({ ...body, image: file.path, id_author: userId });
    } catch (error) {
      throw error;
    }
  }

  async getByUser(userId) {
    try {
      const posts = await Post.findAll({
        where: { id_author: userId },
        attributes: postAttributes,
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
        ],
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
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
        ],
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
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
        ],
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
        include: [
          { model: Category, as: "category", attributes: ["id", "name"] },
        ],
      });
      return waitingApproval;
    } catch (error) {
      throw error;
    }
  }

  async approval(params) {
    try {
      const post = await this.checkPostExists(params);
      if (post === null) throw new PostError("O post não existe");
      if (post.status === 2) throw new PostError("O post já foi aprovado");
      else {
        post.update({ status: 2 });
        await post.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async update(params, body, file, userId, idUserType) {
    try {
      const post = await this.checkPostExists(params);
      const { title, description, slug, id_category } = body;
      if (post === null) throw new PostError("O post não existe");
      if (!title || !description || !slug || !id_category)
        throw new PostError("Existem campos inválidos");
      if (post.id_author !== userId)
        throw new PostError("Você não pode atualizar esse post");
      else {
        post.update({
          title: title,
          description: description,
          slug: slug,
          id_category: id_category,
          image: file.path,
          status: idUserType === 1 ? 2 : 1,
        });
        await post.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(params, userId) {
    try {
      const post = await this.checkPostExists(params);
      if (post === null) throw new PostError("O post não existe");
      if (post.id_author !== userId)
        throw new PostError("Você não pode atualizar esse post");
      else await post.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostServices();
