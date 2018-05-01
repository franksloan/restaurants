var express = require('express');
var User = require('./user');
var emailService = require('./emailService');
var authenticationService = require('./authenticationService');

var app = module.exports = express.Router();

emailService.initialise();

// Route to handle a request to create a new user
app.post('/api/user/create', function(req, res, next) {
  console.log('Request to create new user, ' + req.body.username + ' at /api/user/create')
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
        console.log('user: ' + user)
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
    } else {
      res.status(401).send({
        message: "Please supply username, email and password"
      });
    }
  }
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
app.post('/api/user/new_password', function(req, res, next) {
  console.log(req.body)
  authenticationService.verifyToken(req.body.token, function(response) {
    if(response.email !== req.body.email){
      console.log('Not same emails')
      res.status(401).send(
        { message: "Email address is not the same as the one that requested to reset password" }
      )
      return
    }
    User.findUserByEmail(response.email)
      .then(function(result){
        console.log('Result ', result)
        if(result.length > 1){
          throw new Error('Too many results with this email address - ' + response.email)
        } else if(result.length < 1){
          throw new Error('No results for this email address - ' + response.email)
        }

        if(result[0].passwordResetPending){

          User.hashPassword(req.body.password, function(err, passwordHash){
            if(err){
              next(err)
              return;
            }
            let updateUser = {
              passwordResetPending: false,
              password: passwordHash
            }
            updateUserByEmail(req.body.email, updateUser, next, function(){
              res.status(201).send({})
            })
          })
        } else {
          res.status(401).send({message: "User did not request to reset password"})
        }
    }).catch(next)
  })
});
