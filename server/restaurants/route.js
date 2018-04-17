var express = require('express');
var mongoose = require('mongoose');
var convertGoogleResult = require('./convertGoogleResult.js')
var Restaurant = require('./restaurant')
var Category = require('./category')


var app = module.exports = express.Router();

// Route to handle a
app.get('/get_restaurants', function(req, res, next) {
  Restaurant.getRestaurants((err, results) => {
    console.log(err, results)
    if (err) {
      return next(err)
    }
    res.status(201).send({
      restaurants: results
    });
  })
});

app.get('/get_categories', function(req, res, next) {
  Category.getCategories((results) => {
    res.status(201).send({
      categories: results
    });
  })
});

app.get('/find_restaurant', function(req, res, next) {
  console.log(req.query)
  var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyA-vIs4_qlNrbXIzBYFJZKF9B8lkw0-S4I'
  });

  googleMapsClient.places({
      query: req.query.searchTerm,
      language: 'en',
      location: [51.507781, -0.109348],
      radius: 5000,
      type: 'restaurant'
    }, function(err, response){
      res.status(201).send({
        restaurants: convertGoogleResult(response.json.results)
      });
    })
});

app.post('/add_restaurant', function(req, res, next) {
  var review = {
    user: 'frank',
    detail: req.body.detail,
    rating: req.body.userRating,
    dateAdded: new Date()
  }
  var restaurant = {
    id: req.body.id,
    name: req.body.name,
    link: req.body.link,
    address: req.body.address,
    position: req.body.position,
    category: req.body.category,
    googleRating: req.body.googleRating,
    reviews: [ review ],
    dateAdded: new Date()
  }

  addCategory(restaurant.category)
  //use schema.create to insert data into the db
  Restaurant.create(restaurant, function (err, user) {
    if (err) {
      console.log(require('util').inspect(err));
      return next(err)
    } else {
      res.status(201).send({
        message: 'success'
      });
    }
  });
});


// Adds the category if it doesn't already exist
function addCategory(categoryName){

  Category.findCategory(categoryName, (err, results) => {
    if(err){
      return next(err)
    }
    if(results.length == 0){
      var category = {
        id: mongoose.Types.ObjectId(),
        name: categoryName }

      Category.create(category, function(err){
        if(err){
          console.log(require('util').inspect(err));
          return next(err)
        }
      })
    }
  })
}
