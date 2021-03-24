const { authJwt } = require("../middlewares");
const controller = require("../controllers/review.controller");
const { get } = require("mongoose");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/review/:id", [authJwt.verifyToken], controller.findOneReview);

    app.post("/api/review", [authJwt.verifyToken], controller.createReview);
}