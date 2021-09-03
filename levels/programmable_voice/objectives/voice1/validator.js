const { NiceError, handleError } = require('../../validation');

module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
    helper.env['TQ_TWILIO_NUMBER_SID']
  }">${phoneNumber}</a>`;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);

    if (!number.voiceFallbackUrl) {
      throw `Looks like you still need to set the "Primary Handler Fails" field values for your phone number ${phoneNumberLink}.`;
    }
    const $ = await helper.fakeCall(
      number.voiceFallbackUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { ErrorUrl: number.voiceUrl }
    );
    if ($('Response > Say').length < 1) {
      throw `Whoops you need to use the Say verb in your backup TwiML wired up to ${phoneNumberLink}!`;
    }

    helper.success('Woohoo! Way to back that call up!');
  } catch (e) {
    handleError(e, helper, `
      We couldn't validate the TwiML for your primary handler backup. Check
      the configuration for ${phoneNumberLink} and try again.
    `);
  }
};
