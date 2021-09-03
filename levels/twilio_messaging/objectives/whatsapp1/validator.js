module.exports = async helper => {
  const { messageSid } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw `A message SID is required for validation -
        you get one of these back from an API request that creates a new WhatsApp message.`;
    }

    const message = await client.messages(messageSid).fetch();
    if (message.body === 'Your {{1}} appointment is coming up on {{2}}.') {
      throw `Aw, you used a templated message. Send something creative!`;
    }
    helper.success(`You sent this WhatsApp message: "${message.body}"`);
  } catch (e) {
    helper.fail(e, {
      20404: `Sorry! We couldn't find a message with that SID when we looked in your Twilio account.
            Ensure that your message SID is correct and try again.`,
    });
  }
};
