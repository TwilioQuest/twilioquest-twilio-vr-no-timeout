module.exports = async helper => {
  const { messageSid } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw `Oops, you need to enter a message SID to open this chest!`;
    }

    const media = await client.messages(messageSid).media.list();

    if (media.length <= 0) {
      helper.fail(
        `We didn't find any media files attached to this message!
        
        If your message hasn't arrived in Whatsapp on your phone yet, wait for it to show up and then try hacking again`
      );
    }

    const url = `https://api.twilio.com${media[0].uri}`.replace('.json', '');

    helper.success(`
        Ooh, that picture IS worth a thousand words!
        <br/>
        <img src="${url}" style="width: 100%;margin-top:10px;"/>`);
  } catch (e) {
    helper.fail(e, {
      20404: `We couldn't validate your media WhatsApp  message - either the SID doesn't exist, or the message did not contain media (an image). 
            Please double check your message SID and try again.`,
    });
  }
};
