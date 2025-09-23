const express = require("express");
const router = express.Router();
const booking = require("../models/booking");

// ajout de reservation
router.post("/", async (req, res) => {
  try {
    const { trips } = req.body;
    const bookings = await booking.insertMany(trips);
    res.json({ result: true, bookings });
  } catch (err) {
    res.status(500).json({ result: false, error: err.message });
  }
});

//recuperation des reservation
router.get("/", async (req, res) => {
  try {
    const bookings = await booking.find().sort({ date: 1 }).exec();
    // calcule du temps avec moment.js
    const formattedBookings = bookings.map((b) => {
      const now = moment();
      const departure = moment(b.date);
      const diff = departure.diff(now);

      let waitingTime;
      if (diff <= 0) {
        const departureMoment = moment(b.date);
        waitingTime = `Departed ${departureMoment.fromNow()}`;
      } else {
        waitingTime = moment.utc(diff).format("HH [h] mm [min]");
      }
      return {
        departure: b.departure,
        arrival: b.arrival,
        date: departure.format("YYYY-MM-DD HH:mm"),
        price: b.price,
        waitingTime,
      };
    });
    res.json({ result: true, bookings: formattedBookings });
  } catch (err) {
    res.status(500).json({ result: false, error: err.message });
  }
});

module.exports = router;
