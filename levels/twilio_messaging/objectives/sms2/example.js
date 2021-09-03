const twilio = require('twilio');

// Create authenticated API client as before
const client = twilio(
  process.env.TQ_TWILIO_ACCOUNT_SID,
  process.env.TQ_TWILIO_AUTH_TOKEN
);

// You'll be filling out some of the parameters yourself below.
// Take a look at the "from" parameter format and fill out the "to", "mediaUrl" and "body" parameters.
// The "mediaUrl" parameter must be a fully qualified URL to an image/some media you want to send
// with your message
client.messages
  .create({
    from: process.env.TQ_TWILIO_NUMBER,
    // Input the "to" number here
    // What is the mediaUrl that you want to send in your message?
    // Why don't you add a body parameter too?
  })
  .then(message => {
    console.log(
      'Copy this MMS SID. How does it look different from an SMS SID?'
    );
    console.log(`${message.sid}`);
  })
  .catch(error => {
    console.error('Looks like the Twilio API returned an error:');
    console.error(error);
  });
