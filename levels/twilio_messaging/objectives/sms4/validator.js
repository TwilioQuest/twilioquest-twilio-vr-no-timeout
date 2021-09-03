module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);

    if (!number.smsFallbackUrl) {
      throw `
        Looks like you still need to set the "Primary Handler Fails" 
        field values for your phone number.
      `;
    }

    const $twiml = await helper.fakeMessage(
      number.smsFallbackUrl,
      number.phoneNumber,
      '+15033088404',
      { ErrorUrl: number.smsUrl }
    );

    if ($twiml('Response > Message').length < 1) {
      throw 'Whoops! you need to use the &lt;Message&gt; verb in your TwiML!';
    }

    helper.success('See? Safety <i>is</i> cool.');
  } catch (e) {
    helper.fail(e);
  }
};
