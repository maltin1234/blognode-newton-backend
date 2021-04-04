const router = require("express").Router();
const Post = require("../models/Post");
const postController = require("../controllers/quoteController");

router.post("/create", postController.quoteCreate);

router.post("/update/:id", postController.quoteUpdate);

router.get("/", quoteController.quoteAll);

router.get("/:id", quoteController.quoteSingle);

router.delete("/delete/:id", postController.postDelete);

router.delete("/deleteAll", postController.postDeleteAll);

module.exports = router;
