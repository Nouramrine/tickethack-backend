

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
    hour: String,// format HH:MM
    price: Number,
});


module.exports = mongoose.model("Cart", cartSchema);
