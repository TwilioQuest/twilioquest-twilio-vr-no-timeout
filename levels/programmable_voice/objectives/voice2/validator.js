const { NiceError, handleError } = require('../../validation');

module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
    helper.env['TQ_TWILIO_NUMBER_SID']
  }">${phoneNumber}</a>`;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);

    if (!number.voiceUrl) {
      throw new NiceError(`
        Looks like you still need to set the "On incoming call" field values 
        for your phone number, ${phoneNumberLink}.
      `);
    }
    const $ = await helper.fakeCall(
      number.voiceUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { ErrorUrl: number.voiceUrl }
    );
    if ($('Response > Say').length < 1) {
      throw new NiceError(`
        Whoops - you need to use the Say verb in your TwiML wired 
        up to ${phoneNumberLink}!
      `);
    }
    if ($('Response > Say[voice]').length < 1) {
      throw new NiceError(`
        Whoops - you need to set the voice attribute in your TwiML wired 
        up to ${phoneNumberLink}!
      `);
    }
    if ($('Response > Say[language]').length < 1) {
      throw new NiceError(`
        Whoops - you need to set the language attribute in your TwiML wired 
        up to ${phoneNumberLink}!
      `);
    }

    helper.success('¡Muy bueno!');
  } catch (e) {
    handleError(e, helper, `
      Sorry - we're not able to validate your TwiML. Check the URL configured
      for your number - ${phoneNumberLink}.
    `);
  }
};
