const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require("./models");
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });
var corsOptions = {
  origin: "http://localhost:8083"
};
// const db = require("./models");
db.sequelize.sync();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ParkMe application." });
});
require('./routes/auth_insc.routes')(app);
require('./routes/parking.routes')(app);
require('./routes/reservation.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
