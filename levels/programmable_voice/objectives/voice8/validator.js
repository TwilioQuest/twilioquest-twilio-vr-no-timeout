module.exports = async function(helper) {
  // Number of characters in the expected e.164 format
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
      helper.fakeNumber
    );

    // Find Gather
    if ($('Gather').length === 0) {
      throw `Make sure you include the &lt;Gather&gt; verb in your TwiML wired up to ${phoneNumberLink}`;
    }
    // Ensure Say is nested inside
    if ($('Gather Say').length === 0) {
      throw `Don't forget that you should nest your &lt;Say&gt; verb inside the &lt;Gather&gt; verb in your TwiML wired up to ${phoneNumberLink}.`;
    }
    // Grab numDigits
    if ($('Gather[numdigits="4"]').length === 0) {
      throw 'Whoops make sure you set an attribute named `numDigits` to "4"';
    }

    helper.success(
      'Great job improving that user experience by limiting input!'
    );
  } catch (e) {
    helper.fail(e);
  }
};
