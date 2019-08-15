const express = require("express");
const dbPosts = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  dbPosts
    .get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error in retrieving posts"
      });
    });
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.hub);
});

router.delete("/:id", (req, res) => {
  dbPosts
    .remove(req.params.id)
    .then(count => {
      // res.status(200).json(req.hub);

      if (count > 0) {
        res.status(200).json({ message: "The post has been destroyed" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error removing the user"
      });
    });
});

router.put("/:id", (req, res) => {
  dbPosts
    .update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error updating the post"
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  dbPosts
    .getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({
          message: "No post with specified id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error processing your request"
      });
    });
}

module.exports = router;
