var express = require('express');
var User = require('./user');
var emailService = require('./emailService');
var authenticationService = require('./authenticationService');

var app = module.exports = express.Router();

emailService.initialise();

// Route to handle a request to create a new user
app.post('/api/user/create', function(req, res, next) {

  if (req.body.email &&
      req.body.username &&
      req.body.password) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    // use schema.create to insert data into the db
    User.create(userData)
      .then(function(user){
        // Get authentication token and send an email to user
        emailService.sendAuthenticationMessage(userData.email,
          authenticationService.createToken(userData.email))

        res.status(201).send({
          id_token: user._id,
          username: userData.username
        });
      }).catch((err)=> {
        res.status(401).send({
        	message: err.message
        });
      })
    }}
)

// Route for when a user clicks on the email link to verify
app.get('/api/user/verify_email', function(req, res, next) {
  authenticationService.verifyToken(req.query.token, function(response) {
    User.findUserByEmail(response.email)
      .then(function(result){
        if(result.length > 1){
          throw new Error('Too many results with this email address - ' + response.email)
        } else if(result.length < 1){
          throw new Error('No results for this email address - ' + response.email)
        }

        if(result[0].authenticated){
          res.status(201).redirect('/already_authenticated')
        } else {
          updateUserByEmail(response.email, { verified: true }, next, () => res.status(201).redirect('/thanks'))
        }
    }).catch(next)
  })
});

// Get the user and update its authentication status
function updateUserByEmail(email, update, next, callback){
  User.findOneAndUpdate({email: email}, update, function(err){
    if(err){
      next(err)
    }
    console.log('Sucess')
    callback()
  })
}

// Route to handle a login request
app.post('/api/user/login', function(req, res, next) {
  console.log('login for: ' + req.body.usernameOrEmail)
  if (req.body.usernameOrEmail && req.body.password) {

    User.authenticate(req.body.usernameOrEmail, req.body.password, function (error, user) {

      if (error){
        return next(error);
      } else if (!user) {
        res.status(401).send({
        	message: 'Username, email or password was not valid'
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


// Route to handle a user requesting to reset password
app.post('/api/user/reset_password', function(req, res, next) {
  console.log('reset password for: ' + req.body.email)

  User.findUserByEmail(req.body.email)
    .then(function(result){
      if(result.length > 1){
        throw new Error('Too many results with this email address - ' + response.email)
      } else if(result.length < 1){
        throw new Error('No results for this email address - ' + response.email)
      }

      updateUserByEmail(req.body.email, { passwordResetPending: true }, next, function(){
        // Get authentication token and send an email to user
        emailService.sendPasswordResetMessage(req.body.email,
          authenticationService.createToken(req.body.email))

        res.status(201).send({});
      })
  }).catch(next)

});


// Route for when a user clicks on the email link to reset the password
app.get('/api/user/new_password', function(req, res, next) {
  authenticationService.verifyToken(req.query.token, function(response) {
    User.findUserByEmail(response.email)
      .then(function(result){
        if(result.length > 1){
          throw new Error('Too many results with this email address - ' + response.email)
        } else if(result.length < 1){
          throw new Error('No results for this email address - ' + response.email)
        }

        if(result[0].passwordResetPending){
          res.status(201).redirect('/thanks')
        } else {
          res.status(201).redirect('/already_authenticated')
        }
    }).catch(next)
  })
});
