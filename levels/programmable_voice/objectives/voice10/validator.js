module.exports = async function(helper) {
  // Number of characters in the expected e.164 format
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const cedricNumber = '+19473334160';

  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;
    if (!number.voiceUrl) {
      throw `Looks like you still need to set the "On incoming call" field values for your phone number ${phoneNumberLink}.`;
    }

    const $ = await helper.fakeCall(
      number.voiceUrl,
      number.phoneNumber,
      helper.fakeNumber
    );

    if ($('Dial').length !== 1) {
      throw `Whoops, the TwiML attached to ${phoneNumberLink} doesn't seem to include the &lt;Dial&gt; verb`;
    }

    if (!$('Dial').text().includes(cedricNumber)) {
      throw `
        Ruh roh. To pass validation, your Dial tag specifically needs to dial
        the number "${cedricNumber}".
      `;
    }

    helper.success(`Woot. Very fine dialing, if you don't mind my saying so.`);
  } catch (e) {
    helper.fail(e);
  }
};
