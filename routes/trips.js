const express = require('express');
const router = express.Router();
const trips = require('../models/trip');

// recherche de trajet
router.get("/", (req, res) => {
    res.json({ trips });
});

module.exports = router;