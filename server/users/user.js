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
  }
});

UserSchema.pre('validate', function (next) {
  var user = this;
  User.findUserByEmail(user.email)
    .then(result => {
      if(result.length > 0){
        return next(new Error("This email exists"))
      }
      User.findUserByUsername(user.username)
        .then(result => {
          if(result.length > 0){
            return next(new Error("This username exists"))
          }}
        )
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
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

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
