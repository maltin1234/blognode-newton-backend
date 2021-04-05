const router = require("express").Router();
const Post = require("../models/Post");
const postController = require("../controllers/postController");

//http://localhost:8080/posts/create
router.post("/create", postController.postCreate);

//http://localhost:8080/posts/update/:id
router.post("/update/:id", postController.postUpdate);

//http://localhost:8080/posts
router.get("/", postController.postAll);

//http://localhost:8080/posts/:id
router.get("/:id", postController.postSingle);

//http://localhost:8080/posts/delete/:id
router.delete("/delete/:id", postController.postDelete);

//http://localhost:8080/posts/deleteAll
router.delete("/deleteAll", postController.postDeleteAll);

module.exports = router;
