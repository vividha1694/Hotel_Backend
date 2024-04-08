var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var upload = multer();
var app = express();
var cors = require("cors");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cors());

var rooms = require("./rooms.js");
var photos = require("./photos.js");
var amenities = require("./amenities.js");
var users = require("./users.js");
var bookings = require("./bookings.js");

app.use("/rooms", rooms);
app.use("/photos", photos);
app.use("/amenities", amenities);
app.use("/users", users);
app.use("/bookings", bookings);


// var corsOptions = {
//   origin: "http://localhost:3002/",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.listen(3002);