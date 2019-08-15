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

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
}

module.exports = router;
