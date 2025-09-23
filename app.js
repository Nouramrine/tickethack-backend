var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
const cors = require("cors");
app.use(cors());

const bookingRouter = require("./routes/bookings");
const cartRouter = require("./routes/cart");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/bookings", bookingRouter);
app.use("/cart", cartRouter);

module.exports = app; 
