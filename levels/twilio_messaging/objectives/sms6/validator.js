module.exports = async function(helper) {
  
  const requestParams = {
    Body: 'Ahoy!',
    From: '+12095551212',
  };

  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw 'Looks like you still need to set the incoming field values on your phone number.';
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404',
      requestParams
    );
    if ($('Response > Message[to]').length === 0) {
      throw 'Oops, looks like you need to use a "to" attribute in your TwiML';
    }
    if (
      !$.text().includes(requestParams.From) ||
      !$.text().includes(requestParams.Body)
    ) {
      throw 'Oops, did you include both {{From}} and {{Body}} templating in your TwiML?';
    }

    helper.success('You did it!');
  } catch (e) {
    helper.fail(e);
  }
};
