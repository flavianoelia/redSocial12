const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");

router.post("/", auth, postController.createPost);
router.get("/", auth, postController.listPosts);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.get("/:id", auth, postController.getPost);
router.get("/user-posts/:id", auth, postController.getUserPosts);

module.exports = router;
