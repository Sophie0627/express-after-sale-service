const { authJwt } = require("../middlewares");
const controller = require("../controllers/service.controller");
const { get } = require("mongoose");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-acccess-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/services", [authJwt.verifyToken], controller.findAllServices);

    app.post("/api/service", [authJwt.verifyToken], controller.createService);

    app.get("/api/service/:id", [authJwt.verifyToken], controller.findOneService);
}