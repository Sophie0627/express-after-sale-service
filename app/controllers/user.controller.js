const db = require("../models");
const User = db.user;

exports.createTechnicien = (req, res) => {
  console.log("create technicien");
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "technicien" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "Technicien was registered successfully!" });
      });
    });
  });
  user.createAt;
  user.updateAt;
};

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