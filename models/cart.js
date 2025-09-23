
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  tripId: String,
  departure: String,
  arrival: String,
  price: Number,
});


module.exports = mongoose.model("Cart", cartSchema);
