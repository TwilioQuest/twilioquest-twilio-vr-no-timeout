const twilio = require('twilio');

// Create authenticated API client as before
const client = twilio(
  process.env.TQ_TWILIO_ACCOUNT_SID,
  process.env.TQ_TWILIO_AUTH_TOKEN
);

// You'll be filling out some of the parameters yourself below.
// Take a look at the "from" parameter format and fill out the "to", 
// "mediaUrl" and "body" parameters. The "mediaUrl" parameter must be a 
// fully qualified URL to an image/some media you want to send
// with your message
client.messages
  .create({
    from: '<Insert your WhatsApp Sandbox number here>',
    to: '<Use your own WhatsApp:enabled destination number here>',
    // Add the mediaUrl that you want to send in your message
  })
  .then(message => {
    console.log('Copy this MMS SID to get your XP!');
    console.log(`${message.sid}`);
  })
  .catch(error => {
    console.error('Looks like the Twilio API returned an error:');
    console.error(error);
  });
