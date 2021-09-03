const twilio = require('twilio');

module.exports = (context, callback) => {
  const { accountSid, authToken } = context.validationFields;

  if (!accountSid || !authToken) {
    return callback({
      message: `An account SID and auth token are required - please enter them in the text fields provided.`,
    });
  }

  let c;

  try {
    c = twilio(accountSid, authToken);
  } catch (e) {
    return callback({
      message: `A valid Twilio account SID is required - you'll find this at twilio.com/console, and it starts with an "AC"`,
    });
  }

  c.api.accounts(accountSid).fetch((err, response) => {
    console.log(err, response);
    if (err) {
      callback({
        message: `We couldn't verify your Twilio credentials - ensure they are correct and try again.`,
      });
    } else {
      callback(null, {
        message: `Awesome! Your credentials look good. We'll save these for later.`,
        env: [
          { name: 'TWILIO_ACCOUNT_SID', value: accountSid },
          { name: 'TWILIO_AUTH_TOKEN', value: authToken, concealed: true },
        ],
      });
    }
  });
};
