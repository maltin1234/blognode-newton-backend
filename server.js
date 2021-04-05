const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const postRoute = require("./routes/postRoute");
const postController = require("./controllers/postController");

const app = express();
//Import routes
//const authRoute = require("./routes/auth");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/Post");
mongoose
  .connect(
    "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.pomof.mongodb.net/Blog-Backend?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
app.use("/post", postRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
