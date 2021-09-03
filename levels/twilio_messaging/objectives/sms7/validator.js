module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw 'Did you configure your Phone Number under "A Message Comes In"?';
    }

    if (!number.smsUrl.includes('twil.io')) {
      throw `
        It looks like your SMS URL is not on the <strong>twil.io</strong>
        domain that hosts Functions. Is your SMS handler URL really a Twilio
        Function?
      `;
    }

    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Message').length < 1) {
      throw "Don't forget to use MessagingResponse and message in your TwiML!";
    }

    helper.success('My sources say that you passed!');
  } catch (e) {
    helper.fail(e);
  }
};
