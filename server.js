const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config")
const Role = db.role;
const Status = db.status;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "client"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'client' to roles collection");
        });
  
        new Role({
          name: "technicien"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'technicien' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });

    Status.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Status({
          name: "pending"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'pedding' to statuses collection");
        });
  
        new Status({
          name: "accepted"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'accepted' to statuses collection");
        });
  
        new Status({
          name: "completed"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'completed' to statuses collection");
        });
      }
    });
  }

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/service.routes')(app);
require('./app/routes/review.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});