var jwt = require('jsonwebtoken');

function createToken(emailAddress){

  return jwt.sign({email : emailAddress}, 'secret')
}

function verifyToken(token, callback){
  jwt.verify(token, 'secret', function(err, response){
    if(err){
      console.err("Token verification failed: " + err)
    }
    callback(response)
  })
}

var authenticationService = {
  createToken: createToken,
  verifyToken: verifyToken
}

module.exports = authenticationService
