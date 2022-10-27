const Movie = require('../models/movie');

module.exports = {
  create,
  delete: deleteReview,
  edit,
  update
};

function update(req, res) {
  Movie.findOne({'reviews._id': req.params.id}, function(err, movie) {
    const reviewSubdoc = movie.reviews.id(req.params.id);
    if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/movies/${movie._id}`);
    reviewSubdoc.content = req.body.content;
    reviewSubdoc.rating = req.body.rating;
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

function edit(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Movie.findOne({'reviews._id': req.params.id}, function(err, movie) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = movie.reviews.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('reviews/edit', {review, title: 'Edit Review'});
  });
}

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
