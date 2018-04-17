var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  dateAdded: {
    type: Date,
    required: true,
    default: new Date()
  }
});


CategorySchema.statics.getCategories = function (callback) {
  Category.find({ })
    .exec(function (err, results) {
      return callback(results)
    });
}

CategorySchema.statics.findCategory = function (categoryName, callback) {
  Category.find({ name: categoryName })
    .exec(function (err, results) {
      return callback(err, results)
    });
}

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
