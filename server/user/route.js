var express = require('express');
var User = require('./user');


var app = module.exports = express.Router();

// Route to handle a request to create a new user
app.post('/user_create', function(req, res, next) {

  if (req.body.email &&
      req.body.username &&
      req.body.password) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        res.status(201).send({
          id_token: user._id,
          access_token: 2,
          username: userData.username
        });
      }
    });
  }
});

// Route to handle a login request
app.post('/user_login', function(req, res, next) {
  console.log('login for: ' + req.body.username)
  if ((req.body.email || req.body.username) &&
      req.body.password) {

    User.authenticate(req.body.username, req.body.password, function (error, user) {

      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        res.status(201).send({
        	id_token: user._id,
        	access_token: 2,
          username: user.username
        });
      }
    });
  }
});
