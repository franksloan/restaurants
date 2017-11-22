var express = require('express');
var User = require('./user');


var app = module.exports = express.Router();


app.post('/users_create', function(req, res, next) {

  console.log(req.body)
  
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        // return res.redirect('/');
        res.status(201).send({
          id_token: 1,
          access_token: 2,
          username: userData.username
        });
      }
    });
  }
});