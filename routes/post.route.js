// const express = require("express");
// const postRoutes = express.Router();

// // Require Post model in our routes module
// let Post = require("../models/post.model");

// postRoutes.post("/", (req, res, next) => {
//   const { body } = req;

//   if (!body.title) {
//     return res.status(422).json({
//       errors: {
//         title: "is required",
//       },
//     });
//   }

//   if (!body.body) {
//     return res.status(422).json({
//       errors: {
//         body: "is required",
//       },
//     });
//   }

//   const finalPost = new Post(body);
//   return finalPost
//     .save()
//     .then(() => res.json({ post: finalPost.toJSON() }))
//     .catch(next);
// });
//Defined store route
// postRoutes.route("/add").post(function (req, res) {
//   let post = new Post({ title: req.body.title, body: req.body.body });
//   post
//     .save()
//     .then(() => {
//       res.status(200).json({ business: "business in added successfully" });
//       console.log(req.body.title, req.body.body);
//       console.log("added");
//     })
//     .catch(() => {
//       res.status(400).send("unable to save to database");
//     });
// });
// postRoutes.get("/", (req, res, next) => {
//   return Post.find()
//     .sort({ createdAt: "descending" })
//     .then((posts) => res.json({ posts: posts.map((post) => post.toJSON()) }))
//     .catch(next);
// });
// Defined get data(index or listing) route
// postRoutes.route("/").get(function (req, res) {
//   console.log("getting");

//   Post.find(function (err, posts) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(posts);
//       console.log(posts);
//     }
//   });
// });
// postRoutes.param("id", (req, res, next, _id) => {
//   return Post.findById(_id, (err, post) => {
//     if (err) {
//       return res.sendStatus(404);
//     } else if (post) {
//       req.post = post;
//       return next();
//     }
//   }).catch(next);
// });

// //GET localhost:8000/api/articles/:id = returns a specific article by id.
// postRoutes.get("/:id", (req, res, next) => {
//   return res.json({
//     post: req.post.toJSON(),
//   });
// });
// postRoutes.route("/:_id").get(function (req, res) {
//   Post.get(req.params.post_id, function (err, result) {
//     if (err) {
//       res.status(400);
//       res.json(err);
//     } else {
//       res.status(200);
//       res.json(result);
//     }
//   });
// });
// Defined edit route
// postRoutes.post("/edit/:id", function (req, res) {
//   console.log("edit");
//   let _id = req.params._id;
//   Post.findById(_id, function (err, post) {
//     if (err) {
//       res.json(err);
//     }
//     res.json(post);
//     console.log("post");
//   });
// });

// //  Defined update route
// postRoutes.route("/update/:id").post(function (req, res) {
//   console.log("upd");
//   Post.findById(req.params.id, function (err, post) {
//     console.log("update");
//     if (!post) res.status(404).send("data is not found");
//     else {
//       post.title = req.body.title;
//       post.body = req.body.body;

//       post
//         .save()
//         .then(() => {
//           res.json("Update complete");
//           console.log("update");
//         })
//         .catch(() => {
//           res.status(400).send("unable to update the database");
//         });
//     }
//   });
// });

// // Defined delete | remove | destroy route
// postRoutes.route("/delete/:id").delete(function (req, res) {
//   console.log("del");
//   Post.findByIdAndRemove({ id: req.params.id }, function (err) {
//     if (err) res.json(err);
//     else res.json("Successfully removed");
//     console.log("delete");
//   });
// });

// module.exports = postRoutes;
const express = require("express");
const postRoutes = express.Router();

// Require Post model in our routes module
let Post = require("../models/post.model");

// Defined store route
postRoutes.route("/add").post(function (req, res) {
  let post = new Post(req.body);
  post
    .save()
    .then(() => {
      res.status(200).json({ business: "business in added successfully" });
    })
    .catch(() => {
      return res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRoutes.route("/").get(function (req, res) {
  Post.find(function (err, posts) {
    if (err) {
      return res.json(err);
    } else {
      res.json(posts);
    }
  });
});

// Defined edit route
postRoutes.route("/edit/:id").get(function (req, res) {
  let id = req.params.id;
  Post.findById(id, function (err, post) {
    if (err) {
      return res.json(err);
    }
    res.json(post);
  });
});

//  Defined update route
postRoutes.route("/update/:id").post(function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (!post) res.status(404).send("data is not found");
    else {
      post.title = req.body.title;
      post.body = req.body.body;
      post
        .save()
        .then(() => {
          res.json("Update complete");
        })
        .catch(() => {
          return res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
postRoutes.route("/delete/:id").delete(function (req, res) {
  Post.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = postRoutes;
