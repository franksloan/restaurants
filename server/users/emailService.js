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
        link: 'http://localhost:5050/signin/verify/email?token='+token
      }
  }
  sendgrid.send(email);
  console.log('email sent to: ' + emailAddress, email)
  return token;
}

var emailService = {
  sendAuthenticationMessage: sendAuthenticationMessage,
  initialise: initialise
}

module.exports = emailService


// https://account.bbc.com/signin/verify/email?token=8IXX8gAJx74F8cJLGMazjgO%2BVnjCBH%2FMK6WCIbjypYfZMbqWPyZyPVquAeeDck2WLVWG9KyGefmxmPyFFAAtBN15k0ULyXQHO27Bc7L6wgU%3D&lang=en-GB
