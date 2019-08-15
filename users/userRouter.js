const express = require("express");
const dbUsers = require("./userDb.js");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  dbUsers
    .get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error in retrieving users"
      });
    });
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.hub);
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  dbUsers
    .get(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: "No user with specified id"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error processing your request"
      });
    });
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
