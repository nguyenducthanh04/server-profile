var express = require("express");
var router = express.Router();
const PostsController = require("../controllers/PostsController");

/* GET home page. */
router.get("/", PostsController.getAllPost);
router.post("/", PostsController.createPost);
router.put("/:id", PostsController.updatePost);
router.delete("/:id", PostsController.deletePost);
module.exports = router;
