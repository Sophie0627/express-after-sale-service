const db = require("../models");
const Service = db.service;
const Status = db.status;
const User = db.user;

exports.createService = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    if (!req.body.clientId) {
        res.status(400).send({ message: "ClientID can not be empty!" });
    }

    const service = new Service({
        title: req.body.title,
        description: req.body.description,
        clientId: req.body.clientId,
    });

    User.findById(req.body.clientId, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Wrong ClientId" });
            return;
        }
        
        service.client = user._id;
        
        Status.findOne({ name: "pending"}, (err, status) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            service.status = status._id;

            service.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.status(200).send({ message: "Service was registered successfully!"});
            });
        });
    });

    // Status.findOne({ name: "pending"}, (err, status) => {
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     }

    //     service.status = status._id;
    // });

    // service.save((err, user) => {
    //     if (err) {
    //         res.status(500).send({ message: err});
    //         return;
    //     }
    //     res.status(200).send({ message: "Service was registered successfully!"});
    // });
    service.createAt;
    service.updateAt;
}

exports.findAllServices = (req, res) => {
    Service.find()
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => console.error(error));
};

exports.findOneService = (req, res) => {
    const id = req.params.id;

    Service.findById(id)
    .then(data => {
        if(!data) res.status(404).send({ message: "Not found Service with id " + id});
        else res.status(200).send(data);
    })
    .catch(err => {
        res.status(500)
        .send({ message: "Error retrieving Service with id=" + id});
    });
};

exports.updateService = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Service.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Service with id=${id}. Maybe Service was not found!`
            });
        } else res.status(200).send({ message: "Service was updated successfully."});
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Service with id=" + id
        });
    });
};