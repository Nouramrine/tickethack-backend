

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
  // format HH:MM
    hour: String,
    price: Number,
});


module.exports = mongoose.model("Cart", cartSchema);
