const Movie = require('../models/movie');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  //Note the cool "dot" syntax to query for a 
  // movie with a review nested within an array
  Movie.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  }).then(function(movie) {
    if (!movie) return res.redirect('/movies');
    movie.reviews.remove(req.params.id);
    movie.save().then(function() {
      res.redirect(`/movies/${movie._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

function create(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    // Requiring a user to authorize the review
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // We push an object with the data for the
    // review subdoc into Mongoose arrays
    movie.reviews.push(req.body);
    movie.save(function(err) {
      // Step 5: Respond with a redirect because we've mutated data
      res.redirect(`/movies/${movie._id}`);
    });
  });
}
