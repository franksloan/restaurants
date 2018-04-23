var express = require('express');
var User = require('./user');
var emailService = require('./emailService');

var app = module.exports = express.Router();

emailService.initialise();

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
    console.log(emailService)
    emailService.sendAuthenticationMessage(userData.email)

    // use schema.create to insert data into the db
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

app.get('/signin/verify/email', function(req, res, next) {
  console.log(req.query.token)
  res.status(201).send({token: req.query.token})
});

// Route to handle a login request
app.post('/user_login', function(req, res, next) {
  console.log('login for: ' + req.body.username)
  if ((req.body.email || req.body.username) &&
      req.body.password) {

    User.authenticate(req.body.username, req.body.password, function (error, user) {

      if (error){
        console.log(error)
        var err = new Error('Something went wrong.');
        err.status = 401;
        return next(err);
      } else if (!user) {
        res.status(201).send({
        	error: new Error('Username or password was not valid')
        });
      } else {
        console.log("Login success for " + user.username)
        res.status(201).send({
        	id_token: user._id,
        	access_token: 2,
          username: user.username
        });
      }
    });
  }
});
