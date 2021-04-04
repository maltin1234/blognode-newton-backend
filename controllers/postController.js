const router = require("express").Router();
const Quote = require("../models/Quote");
const quouteRoute = require("../routes/quoteRoute");
const server = require("../server");

// find all quotes
const postAll = (req, res) => {
  Quote.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// find single quote by id
const postSingle = (req, res) => {
  const id = req.params.id;
  Quote.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// create a quote
const postCreate = (req, res) => {
  console.log(req.body);
  const quote = new Quote({
    title: req.body.title,
    text: req.body.text,
    keyword: req.body.keyword,
  });
  quote
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete a quote by id
const postDelete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Quote with id=${id}. Maybe quote was not found!`,
        });
      } else {
        res.send({
          message: "Quote was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete quote with id=" + id,
      });
    });
};

// update quote  by id
const postUpdate = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
const quoteDeleteAll = (req, res) => {
  Quote.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

//Find document by key word
const quoteKeyword = (req, res) => {
  Quote.find({ keyword: req.body.keyword })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get a quote by a searchstring
module.exports = {
  quoteAll,
  quoteSingle,
  quoteCreate,
  quoteDelete,
  quoteUpdate,
  posyDeleteAll,
};
