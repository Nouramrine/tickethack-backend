const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);
