var sendgrid = require('@sendgrid/mail');
var jwt = require('jsonwebtoken');
var url = process.env.NODE_ENV == 'production' ? 'https://dishyclub.herokuapp.com/' : 'http://localhost:5050/'

function initialise(){
  sendgrid.setApiKey(null);
}

function sendAuthenticationMessage(emailAddress, token){

  var email = {
      to: emailAddress,
      from: 'test@example.com',
      subject: 'Please authenticate with dishy.club',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      template_id: '4bd9221a-f41b-4984-8cad-95d9443cc3e2',
      substitutionWrappers: [':', ''],
      substitutions: {
        link: url + 'api/user/verify_email?token='+token
      }
  }
  console.log('Attempted to send email to: ' + emailAddress, email)
  return sendgrid.send(email);
}


function sendPasswordResetMessage(emailAddress, token){

  var email = {
      to: emailAddress,
      from: 'test@example.com',
      subject: 'Reset your dishy.club password',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      template_id: '4bd9221a-f41b-4984-8cad-95d9443cc3e2',
      substitutionWrappers: [':', ''],
      substitutions: {
        link: url + 'reset_password/'+token
      }
  }
  return sendgrid.send(email);
}

var emailService = {
  sendAuthenticationMessage: sendAuthenticationMessage,
  sendPasswordResetMessage: sendPasswordResetMessage,
  initialise: initialise
}

module.exports = emailService
