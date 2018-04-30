var sendgrid = require('@sendgrid/mail');
var jwt = require('jsonwebtoken');

function initialise(){
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
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
        link: 'http://localhost:5050/api/user/verify_email?token='+token
      }
  }
  sendgrid.send(email);
  console.log('email sent to: ' + emailAddress, email)
  return token;
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
        link: 'http://localhost:5050/reset_password/'+token
      }
  }
  sendgrid.send(email);
  console.log('email sent to: ' + emailAddress, email)
  return token;
}

var emailService = {
  sendAuthenticationMessage: sendAuthenticationMessage,
  sendPasswordResetMessage: sendPasswordResetMessage,
  initialise: initialise
}

module.exports = emailService
