const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');

// This router is mounted to a "starts with" path of '/'

// GET /performers/new
router.get('/performers/new', performersCtrl.new);
// POST /performers
router.post('/performers', performersCtrl.create);
// POST /movies/:id/performers (assoc movie & performer)
router.post('/movies/:id/performers', performersCtrl.addToCast);

module.exports = router;