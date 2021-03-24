const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { get } = require("mongoose");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllUsers);

  app.get(
    "/api/user/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOneUser
  );

  app.post("/api/user/technicien", 
    [
      verifySignUp.checkDuplicateUsernameOrEmail, 
      verifySignUp.checkRolesExisted, 
      authJwt.isAdmin
    ], 
    controller.createTechnicien
  );

  app.delete("/api/user/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

  // app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isTechnicien],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};