
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
  price: Number,
});


module.exports = mongoose.model("Cart", cartSchema);
