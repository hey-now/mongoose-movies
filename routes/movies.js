var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies');

// All routes start with '/movies'

// GET /movies (index functionality)
router.get('/', moviesCtrl.index);
// GET /movies/new (new functionalit)
router.get('/new', moviesCtrl.new);
// GET /movies/:id (show functionality)
router.get('/:id', moviesCtrl.show);
// POST /movies (create functionality)
router.post('/', moviesCtrl.create);

module.exports = router;
