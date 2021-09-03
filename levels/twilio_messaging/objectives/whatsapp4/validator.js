const imageEmbed = `
<style>
  .img {
    position: relative;
    display: inline-block;
    float: right;
  }
</style>
<img src="images/whatsapp/doge.jpg">
`;
module.exports = async helper => {
  const { messageSid } = helper.validationFields;
  const isFormatted = bodyString => {
    return ['*', '_', '~', '```'].some(symbol => bodyString.includes(symbol));
  };

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw `A message SID is required for validation - 
        you get one of these back from an API request that creates a new SMS message.`;
    }

    const message = await client.messages(messageSid).fetch();

    if (!isFormatted(message.body)) {
      throw `Oh dear, it looks like your message body didn't include any formatting symbols.`;
    }

    helper.success(`You said: "${message.body}" ${imageEmbed}`);
  } catch (e) {
    helper.fail(e, {
      20404: `Sorry! We couldn't find a message with that SID when we looked in your Twilio account. 
            Ensure that your message SID is correct and try again.`,
    });
  }
};
