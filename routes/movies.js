var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/movies'

// GET /movies (display all movies)
router.get('/', moviesCtrl.index);
// GET /movies/new (display a form for entering a new movie)
router.get('/new', ensureLoggedIn, moviesCtrl.new);
// GET /movies/:id (display a "detail/show" page for a single movie)
router.get('/:id', moviesCtrl.show);
// POST /movies (handle the new form being submitted)
router.post('/', ensureLoggedIn, moviesCtrl.create);

module.exports = router;
