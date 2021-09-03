module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];

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
      helper.fakeNumber,
      { ErrorUrl: number.voiceUrl }
    );
    if ($('Response > Say').length < 1) {
      throw `Whoops you need to use the Say verb in your TwiML wired up to ${phoneNumberLink}!`;
    }
    if ($('Response > Say[loop="2"]').length < 1) {
      throw `Whoops you need to set the loop attribute to 2 in your TwiML wired up to ${phoneNumberLink}!`;
    }

    helper.success('Awesome job! Awesome job!');
  } catch (e) {
    helper.fail(e);
  }
};
