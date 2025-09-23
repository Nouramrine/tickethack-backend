const express = require('express');
const router = express.Router();
const cart = require('../models/cart');



// GET : Récupérer tous les trajets du panier
router.get("/", (req, res) => {
  res.json({ cart });
});

// POST / Ajouter un trajet dans le panier
router.post("/", (req, res) => {
  const {departure, arrival, price, hour } = req.body;
  if (!departure || !arrival || !price) {
    return res.status(400).json({ error: "Données du trajet incomplètes" });
  }
  cart.push({departure, arrival, price, hour });
  res.json({ message: "Trajet ajouté au panier", cart });
});

//  DELETE / Supprimer un trajet spécifique
router.delete("/", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((trip) => trip.id !== id);
  res.json({ message: "Trajet supprimé du panier", cart });
});

// Payer le panier (vider et transférer vers bookings)
router.post("/pay", (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ error: "Le panier est vide" });
  }
  bookings.push(...cart);
  cart = [];
  res.json({ message: "Paiement effectué", bookings });
});

module.exports = router;