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

router.delete("/:id", (req, res) => {
  dbUsers
    .remove(req.params.id)
    .then(count => {
      // res.status(200).json(req.hub);

      if (count > 0) {
        res.status(200).json({ message: "The user has been destroyed" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
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
  dbUsers
    .update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });
});

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
