const twilio = require('twilio');

// Create authenticated API client as before
const client = twilio(
  process.env.TQ_TWILIO_ACCOUNT_SID,
  process.env.TQ_TWILIO_AUTH_TOKEN
);

// You'll be filling out some of the parameters yourself below.
client.messages
  .create({
    from: '<Insert your WhatsApp Sandbox number here>',
    to: '<Use your own WhatsApp:enabled destination number here>',
    body: '<Fill in the body...but with formatting!>',
  })
  .then(message => {
    console.log('Copy this message SID to get your XP!');
    console.log(`${message.sid}`);
  })
  .catch(error => {
    console.error('Looks like the Twilio API returned an error:');
    console.error(error);
  });
