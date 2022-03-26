const Post = require("@models/Post");
const PostError = require("@errors/HandlerExceptions");
const CategoryServices = require("@services/CategoryServices");
const postAttributes = require("@/helpers/attributes/postAttributes");

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
      const { title, description, slug, idCategory } = body;
      const categoryExists = await CategoryServices.findCategory(idCategory);
      if (categoryExists === null)
        throw new PostError("A categoria informada na postagem não existe");
      if (!title || !description || !slug || !idCategory)
        throw new PostError("Existem campos inválidos");
      else await Post.create({ ...body, image: file.path, idAuthor: userId });
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
  async update(params, body, userId, idUserType) {
    try {
      const post = await this.checkPostExists(params);
      const { title, description, slug, idCategory } = body;
      if (post === null) throw new PostError("O post não existe");
      if (post.idAuthor !== userId)
        throw new PostError("Você não pode atualizar esse post");
      else {
        post.update({
          title,
          description,
          slug,
          idCategory,
          status: idUserType === 1 ? 2 : 1,
        });
        await post.save();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostServices();
