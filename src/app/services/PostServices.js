const Post = require("../models/Post");
const Category = require("../models/Category");
const PostError = require("../errors/PostExceptions");

class PostServices {
  async findCategory(idCategory) {
    try {
      const category = await Category.findOne({ where: { id: idCategory } });
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(body, userId) {
    try {
      const { title, description, idCategory } = body;
      const categoryExists = await this.findCategory(idCategory);
      if (categoryExists === null)
        throw new PostError("A categoria informada na postagem não existe");
      if (!title || !description || !idCategory)
        throw new PostError("Existem campos inválidos");
      else await Post.create({ ...body, idAuthor: userId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostServices();
