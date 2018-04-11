var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  link: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  address: {
    type: String
  },
  position: {
    type: Mixed,
    required: true
  }
});


RestaurantSchema.statics.getRestaurants = function (username, password, callback) {
  User.find({ })
    .exec(function (err, user) {
      return callback()
    });
}

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
