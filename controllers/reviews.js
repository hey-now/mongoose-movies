const Movie = require('../models/movie');

module.exports = {
  create
};

function create(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    // We push an object with the data for the
    // review subdoc into Mongoose arrays
    movie.reviews.push(req.body);
    movie.save(function(err) {
      // Step 5
      res.redirect(`/movies/${movie._id}`);
    });
  });
}