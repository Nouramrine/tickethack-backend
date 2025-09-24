const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const Booking = require("../models/booking");

const Cart = [];

// Récupérer tous les trajets du panier
router.get("/", (req, res) => {
  res.json({ cart: Cart });
});

// Ajouter un trajet dans le panier
router.post("/", async (req, res) => {
  try {
    const { tripId } = req.body;
    if (!tripId) return res.status(400).json({ error: "tripId requis" });

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(400).json({ error: "Trajet non trouvé" });

    Cart.push({
      id: trip._id,
      departure: trip.departure,
      arrival: trip.arrival,
      price: trip.price,
      hour: trip.date,
    });

    res.json({ message: "Trajet ajouté au panier", cart: Cart });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Supprimer un trajet spécifique du panier
router.delete("/:id", (req, res) => {
  const index = Cart.findIndex((t) => t.id.toString() === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Trajet non trouvé" });

  Cart.splice(index, 1);
  res.json({ message: "Trajet supprimé du panier", cart: Cart });
});

//  Payer le panier et créer des réservations
router.post("/pay", async (req, res) => {
  if (Cart.length === 0)
    return res.status(400).json({ error: "Le panier est vide" });

  try {
    const newBookings = await Booking.insertMany(
      Cart.map((t) => ({
        departure: t.departure,
        arrival: t.arrival,
        date: t.hour,
        price: t.price,
      }))
    );

    Cart.length = 0;

    res.json({
      message: "Paiement effectué et réservations créées",
      bookings: newBookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création des bookings" });
  }
});

module.exports = router;
