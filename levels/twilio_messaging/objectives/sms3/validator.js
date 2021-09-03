module.exports = async helper => {
  const { messageSid, lastStatus } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw `A message SID required for validation.`;
    }
    if (!lastStatus) {
      throw `To validate, please enter the last status update you received at your callback URL.`;
    }

    const message = await client.messages(messageSid).fetch();
    if (message.status != lastStatus) {
      throw `Oh dear, it looks like your message's final status doesn't match what you entered.
              Check that you're looking at the last status update you received at your callback URL.`;
    }

    helper.success(`Amazing! Your message's last status was: "${
      message.status
    }", 
                    which means you should have received a reply to your message.`);
  } catch (e) {
    helper.fail(e, {
      20404: `Sorry! We couldn't find a message with that SID when we looked in your Twilio account. 
            Ensure that you're entering the correct MessageSid and try again.`,
    });
  }
};
