const Movie = require('../models/movie');
const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newMovie,
  create
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', { title: 'All Movies', movies });
  });
}

function show(req, res) {
  Movie.findById(req.params.id)
    .populate('cast')
    .exec(function(err, movie) {
      Performer.find(
        {_id: {$nin: movie.cast}},
        function(err, performers) {
          console.log(performers);
          res.render('movies/show', {
            title: 'Movie Detail',
            movie,
            performers
          });
        }
      );
    });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
}

function create(req, res) {
  // Convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove leading/trailing spaces
  req.body.cast = req.body.cast.trim();
  // Split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Delete empty properties on req.body for defaults to happen 
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    console.log(movie);
    res.redirect(`/movies/${movie._id}`);
  });
}
