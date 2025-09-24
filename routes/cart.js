const express = require("express");
const router = express.Router();
const Cart = [];
const trips = require("../models/trip");
const bookings = [];

// GET : Récupérer tous les trajets du panier
router.get("/", (req, res) => {
  res.json({ cart: Cart });
});

// POST / Ajouter un trajet dans le panier
// router.post("/", (req, res) => {
//   const {departure, arrival, price, hour } = req.body;
//   if (!departure || !arrival || !price) {
//     return res.status(400).json({ error: "Données du trajet incomplètes" });
//   }
//   cart.push({departure, arrival, price, hour });
//   res.json({ message: "Trajet ajouté au panier", cart });
// });
router.post("/", async (req, res) => {
  try {
    const { tripId } = req.body;
    if (!tripId) {
      return res.status(400).json({ error: "tripId requis" });
    }
    const trip = await trips.findById(tripId);

    if (!trip) {
      return res.status(400).json({ error: "Trajet non trouvé" });
    }
    Cart.push({
      id: trip._id,
      departure: trip.departure,
      arrival: trip.arrival,
      price: trip.price,
      hour: new Date(trip.date).toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    res.json({ message: "Trajet ajouté au panier", cart: Cart });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});
//  DELETE / Supprimer un trajet spécifique
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // cart = cart.filter((trip) => trip.id !== id);
  // res.json({ message: "Trajet supprimé du panier", cart });
  const index = Cart.findIndex((trip) => trip.id.toString() === id);
  Cart.splice(index, 1);
  res.json({ message: "Trajet supprimé du panier", cart: Cart });
});

// Payer le panier (vider et transférer vers bookings)
router.post("/pay", (req, res) => {
  if (Cart.length === 0) {
    return res.status(400).json({ error: "Le panier est vide" });
  }
  bookings.push(...Cart);
  Cart.length = 0;
  res.json({ message: "Paiement effectué", bookings });
});

module.exports = router;
