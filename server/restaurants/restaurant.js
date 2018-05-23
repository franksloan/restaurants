var mongoose = require('mongoose');
var reviewSchema = require('./review')

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
  reviews: [reviewSchema],
  dateAdded: {
    type: Date,
    required: true,
    default: new Date()
  },
  addedBy: {
    type: String,
    required: true
  }
});


// Before adding restaurant check if it already exists
RestaurantSchema.pre('validate', function (next) {
  var restaurant = this;
  Restaurant.findRestaurantById(restaurant.id)
    .then(result => {
      if(result == null){
        next()
      }
      if(result.length > 0){
        return next(new Error("This restaurant has already been added - " + restaurant.name))
      }
      next()
    }).catch(next)
})

RestaurantSchema.statics.findRestaurantById = function (id) {
  return Restaurant.findOne({ id: id }).exec()
}


RestaurantSchema.statics.getRestaurants = function (callback) {
  Restaurant.find({ })
    .exec(function (err, results) {
      return callback(err, results)
    });
}

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
