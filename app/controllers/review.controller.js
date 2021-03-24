const db = require("../models");
const Service = db.service;
const Review = db.review;

exports.createReview = (req, res) => {

    if (!req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    if (!req.body.serviceId) {
        res.status(400).send({ message: "ServiceID can not be empty!" });
    }

    const review = new Review({
        content: req.body.content,
    })

    Service.findById(req.body.serviceId, (err, service) => {
        if (err) {
            res.status(500).send({ message: "Wrong ServiceId"});
            return;
        }

        review.service = service._id;

        review.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ message: "Review was registered successfully!" });
        });
    });
    review.createAt;
    review.updateAt;
}

exports.findOneReview = (req, res) => {
    const id = req.params.id;

    Review.findById(id)
    .then(data => {
        if(!data) res.status(404).send({ message: "Not found Review with id " + id});
        else res.status(200).send(data);
    })
    .catch(err => {
        res.status(500)
        .send({ message: "Error retrieving Review with id=" + id});
    });
}