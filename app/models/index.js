const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.status = require("./status.model");
db.service = require("./service.model");
db.review = require("./review.model");

db.ROLES = ["client", "admin", "technicien"];
db.STATUS = ["pending", "accepted", "completed"];

module.exports = db;