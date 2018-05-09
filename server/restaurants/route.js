var express = require('express');
var mongoose = require('mongoose');
var convertGoogleResult = require('./convertGoogleResult.js')
var Restaurant = require('./restaurant')
var Category = require('./category')


var app = module.exports = express.Router();

// Route to handle a
app.get('/get_restaurants', function(req, res, next) {
  console.log('Request to get restaurants')
  Restaurant.getRestaurants((err, results) => {
    if (err) {
      return next(err)
    }
    res.status(201).send({
      restaurants: results
    });
  })
});

app.get('/get_categories', function(req, res, next) {
  console.log('Request to get categories')
  Category.getCategories((results) => {
    res.status(201).send({
      categories: results
    });
  })
});

app.get('/find_restaurant', function(req, res, next) {
  console.log('Request to find restaurant on google places API')
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
  console.log('Request to add new restaurant')
  var review = {
    detail: req.body.detail,
    rating: req.body.userRating,
    dateAdded: new Date(),
    addedBy: 'frank'
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
    dateAdded: new Date(),
    addedBy: 'frank'
  }

  //use schema.create to insert data into the db
  Restaurant.create(restaurant).then(function (user) {
    addCategory(restaurant.category)
    res.status(201).send({
      message: 'success'
    })
  }).catch(err => {
    res.status(401).send({
      message: err.message
    })
    next(err)
  })
})


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
