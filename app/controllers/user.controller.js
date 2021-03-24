const db = require("../models");
const User = db.user;

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

// exports.create = (req, res) => {

// };

exports.findAllUsers = (req, res) => {
  User.find()
  .then(results => {
    res.status(200).send(results);
  })
  .catch(error => console.error(error));
};

exports.findOneUser = (req, res) => {
  const id = req.params.id;

  User.findById(id)
  .then(data => {
    if (!data) 
      res.status(404).send({ message: "Not found User with id " + id });
    else res.status(200).send(data); 
  })
  .catch(err => {
    res.status(500)
    .send({ message: "Error retrieving User with id=" + id });
  });
};

// exports.update = (req, res) => {

// };

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
  .then(data => {
    if(!data) {
      res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      })
    } else {
      res.status(200).send({
        message: "User was deleted successfully!"
      })
    }
  })
};

// exports.deleteAll = (req, res) => {

// };

// exports.findAllPublished = (req, res) => {

// };