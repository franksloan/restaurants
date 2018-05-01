var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  passwordResetPending: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Before creating user validate that there is no user
// with the same username or email
UserSchema.pre('validate', function (next) {
  var user = this;
  User.findUserByEmail(user.email)
    .then(result => {
      if(result.length > 0){
        return next(new Error("This email already exists"))
      }
      User.findUserByUsername(user.username)
        .then(result => {
          if(result.length > 0){
            return next(new Error("This username already exists"))
          }
          next()
        })
    }).catch(next)
})

UserSchema.statics.findUserByEmail = function (email) {
  return User.find({ email: email }).exec()
}

UserSchema.statics.findUserByUsername = function (username) {
  return User.find({ username: username }).exec()
}


//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  console.log('Save: ' + this)
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//hashing a password before saving it to the database
UserSchema.statics.hashPassword = function(password, callback) {
  console.log('Hashing: ' + this)
  var user = this;
  bcrypt.hash(password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    return callback(null, hash)
  })
}


UserSchema.statics.authenticate = function (usernameOrEmail, password, callback) {
  console.log("Username or email is: " + usernameOrEmail)
  User.findOne({ $or: [{username: usernameOrEmail}, {email: usernameOrEmail} ]})
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        // Handle no user being found in the caller
        return callback(null, null);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
