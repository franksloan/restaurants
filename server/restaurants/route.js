var express = require('express');
var convertGoogleResult = require('./convertGoogleResult.js')
var Restaurant = require('./restaurant')


var app = module.exports = express.Router();

// Route to handle a
app.get('/get_restaurants', function(req, res, next) {
  Restaurant.getRestaurants((results) => {
    res.status(201).send({
      restaurants: results
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


  var restaurant = {
    id: req.body.id,
    name: req.body.name,
    link: req.body.link,
    address: req.body.address,
    position: req.body.position,
    category: req.body.category,
    googleRating: req.body.googleRating
  }
  console.log(restaurant)
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

const restaurantsList = [
  {
    id: 1,
    name: "Barrafina",
    link: "http://www.barrafina.co.uk/",
    address: "10 Adelaide St, London WC2N 4HZ",
    position: {lat: 51.5093954, lng: -0.1257111},
    averageRating: 8.6
  },
  {
    id: 2,
    name: "Hoppers Soho",
    link: "https://www.hopperslondon.com/",
    address: "49 Frith Street, London",
    position: {lat: 51.51360649999999, lng: -0.1316802},
    averageRating: 8.2
  }
]
