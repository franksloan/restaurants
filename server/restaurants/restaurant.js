var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  id: {
    type: String,
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
    unique: false,
    trim: true
  },
  address: {
    type: String
  },
  position: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  googleRating: {
    type: Number
  },
  category: {
    type: String
  },
  reviews: {
    type: Array
  },
  dateAdded: {
    type: Date,
    required: true,
    default: new Date()
  }
});


RestaurantSchema.statics.getRestaurants = function (callback) {
  Restaurant.find({ })
    .exec(function (err, results) {
      return callback(err, results)
    });
}

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
