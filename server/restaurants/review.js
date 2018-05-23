var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  detail: {
    type: String
  },
  rating: {
    type: Number
  },
  dateAdded: {
    type: Date,
    required: true,
    default: new Date()
  },
  addedBy: {
    type: String,
    required: true
  }
})


module.exports = ReviewSchema;
