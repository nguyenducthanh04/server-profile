const model = require("../models/index");
const Posts = model.Posts;

class PostsController {
  async getAllPost(req, res) {
    const postsList = await Posts.findAll();
    res.json(postsList);
  }
  async createPost(req, res) {
    const { title, content, fileName, filePath } = req.body;
    const createPost = await Posts.create({
      title,
      content,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });
    res.json(createPost);
  }
  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content, fileName, filePath } = req.body;
    const updatePost = await Posts.update(
      { title, content, fileName, filePath },
      {
        where: {
          id,
        },
      }
    );
    res.json(updatePost);
  }
  async deletePost(req, res) {
    const { id } = req.params;
    const deletePost = await Posts.destroy({
      where: {
        id,
      },
    });
    res.json(deletePost);
  }
}
module.exports = new PostsController();
