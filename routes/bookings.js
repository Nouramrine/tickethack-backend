const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");

//  récupérer toutes les réservations
router.get("/", async (req, res) => {
  try {
    const bookingsData = await Booking.find().sort({ date: 1 }).exec();

    const formattedBookings = bookingsData.map((b) => {
      const now = moment();
      const departure = moment(b.date);
      const diff = departure.diff(now);

      let waitingTime;
      if (diff <= 0) {
        waitingTime = `Departed ${departure.fromNow()}`;
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
