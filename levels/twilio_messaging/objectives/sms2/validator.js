module.exports = async function(helper) {
  const { messageSid } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw new Error(`
        A message SID is required for validation 
        - you get one of these back from an API request that creates a new 
        MMS message.
      `);
    }

    // First, check to see if the message was sent at all...
    const mms = await client.messages(messageSid).fetch();
    console.log(mms);

    // Ensure it was an MMS - the SID should start with "MM"
    if (!mms.sid.startsWith('MM')) {
      throw new Error(`
        MMS message SIDs start with the letters "MM" - did your message SID
        start with these letters? Regular SMS message SIDs start with the
        letters "SM".
      `);
    }

    let successMessage = `Hooray! We found your MMS message.`;

    // Try and fetch the media for the message, if it has been created
    const media = await client.messages(messageSid).media.list();
    if (media[0]) {
      const url = `https://api.twilio.com${media[0].uri}`.replace('.json', '');
      successMessage += `
        Does this look familiar? <br/>
        <img src="${url}" style="width:80%;margin:10px auto;display:block;"/>
      `;
    }

    // Display happy message
    helper.success(successMessage);
  } catch (e) {
    console.log(e);
    if (e.status === 404) {
      helper.fail(`
        We couldn't find a message in your account with the SID you gave us.
        Double check the SID and try again.
      `);
    } else {
      helper.fail(e.message);
    }
  }
};
