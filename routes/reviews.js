const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// All routes "starts with" / (root)

// POST /movies/:id/reviews
router.post('/movies/:id/reviews', reviewsCtrl.create);

module.exports = router;