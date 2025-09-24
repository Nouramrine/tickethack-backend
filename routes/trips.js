const express = require("express");
const router = express.Router();
const trips = require("../models/trip");

// // recherche des trajets
// router.get("/", (req, res) => {
//     trips.find().then(data => {
//         res.json({ trips: data });
//     });
// });

// // recherche des trajets par villes
// router.get("/:departure", (req, res) => {
//     trips.find({ departure: { $regex: new RegExp(req.params.departure, "i") },
//     }).then(city => {
//         if (city) {
//             res.json({ result: true, trips: city });
//         } else {
//             res.json({ result: false, error: "City not found" });
//         }
//     });
// });

// route pour scriptV2

router.get("/", async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;

    const filter = {};
    if (departure)
      filter.departure = { $regex: new RegExp(`^${departure}$`, "i") };
    if (arrival) filter.arrival = { $regex: new RegExp(`^${arrival}$`, "i") };
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    const data = await trips.find(filter);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
