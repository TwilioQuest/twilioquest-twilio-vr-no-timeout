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
    const twimlUrl = new URL(number.voiceUrl);

    const $ = await helper.fakeCall(
      twimlUrl.toString(),
      number.phoneNumber,
      helper.fakeNumber
    );
    
    if (!$.text().includes(helper.fakeNumber)) {
      throw 'I did not find the number I was calling from in your TwiML. Did you add a {{ From }} placeholder so it could be shown?';
    }

    helper.success("You're so dynamic!");
  } catch (e) {
    helper.fail(e);
  }
};
