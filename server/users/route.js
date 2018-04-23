var express = require('express');
var User = require('./user');
var emailService = require('./emailService');
var authenticationService = require('./authenticationService');

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

    // Get authentication token and send an email to user
    emailService.sendAuthenticationMessage(userData.email,
      authenticationService.createToken(userData.email))

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
  authenticationService.verifyToken(req.query.token, function(response) {
    var dateString = new Date(response.iat*1000).toUTCString()
    User.findUserByEmail(response.email, function(err, result){
      if(err){
        return next(err)
      } else if(result.length > 1){
        throw new Error('Too many results with this email address - ' + response.email)
      } else if(result.length < 1){
        throw new Error('No results for this email address - ' + response.email)
      }
      var user = result[0]
      if(user.authenticated){
        res.status(201).redirect('/already_authenticated')
      } else {
        console.log(result)
        User.findOneAndUpdate({email: response.email}, {authenticated: true}, function(err, result2){
          console.log('Sucess')
          res.status(201).redirect('/thanks')
        })

      }
    })
  })
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
