const express = require('express');
const router = express.Router();
const trips = require('../models/trip');

// recherche des trajets
router.get("/", (req, res) => {
    trips.find().then(data => {
        res.json({ trips: data });
    });
});

// recherche des trajets par villes
router.get("/:departure", (req, res) => {
    trips.find({ departure: { $regex: new RegExp(req.params.departure, "i") },
    }).then(city => {
        if (city) {
            res.json({ result: true, trips: city });
        } else {
            res.json({ result: false, error: "City not found" });
        }
    });
});


module.exports = router;