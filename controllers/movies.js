const Movie = require('../models/movie');

module.exports = {
  new: newMovie,
  create
};

function create(req, res) {
  // Convert nowShowing's checkbox to a boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove leading/trailing spaces
  req.body.cast = req.body.cast.trim();
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  const movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    console.log(movie);
    res.redirect('/movies/new');
  });
}

function newMovie(req, res) {
  res.render('movies/new');
}