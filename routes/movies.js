var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies');

// All routes start with '/movies'

// GET /movies/new
router.get('/new', moviesCtrl.new);

module.exports = router;
