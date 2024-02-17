// var express = require("express");
// var router = express.Router();
// const multer = require("multer");
// const PostsController = require("../controllers/PostsController");
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });

//   const upload = multer({ storage: storage });
// /* GET home page. */
// router.get("/", PostsController.getAllPost);
// router.post("/", PostsController.createPost);
// router.put("/:id", PostsController.updatePost);
// router.delete("/:id", PostsController.deletePost);
// module.exports = router;

var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs").promises; // for file deletion
const { Posts } = require("../models");

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// GET /api/posts - Get all posts
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/posts - Create a new post
router.post("/api/posts", upload.single("file"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const { filename, path } = req.file;

    const post = await Posts.create({
      title,
      content,
      fileName: filename,
      filePath: path,
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /api/posts/:id - Update a post
router.put("/api/posts/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    let updatedFields = { title, content };

    // Check if file is uploaded
    if (req.file) {
      const { filename, path } = req.file;
      updatedFields = { ...updatedFields, fileName: filename, filePath: path };
    }

    const post = await Posts.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.update(updatedFields);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE /api/posts/:id - Delete a post
router.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete associated file
    await fs.unlink(post.filePath);

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const postDetail = await Posts.findOne({
    where: {
      id,
    },
  });
  res.json(postDetail);
});
module.exports = router;
