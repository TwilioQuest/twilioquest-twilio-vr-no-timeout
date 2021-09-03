module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw 'Did you configure your Phone Number under "A Message Comes In"?';
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Redirect').length < 1) {
      throw 'Uh oh! Make sure to use a Redirect verb in your TwiML.';
    }

    helper.success('You Redirection skills are strong!');
  } catch (e) {
    helper.fail(e);
  }
};
