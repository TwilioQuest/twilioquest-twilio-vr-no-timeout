module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw `
        Looks like you still need to set the incoming field values on your 
        phone number.
      `;
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Message').length < 1) {
      throw `Don't forget to use the &lt;Message&gt; verb in your TwiML! 
              Here's what we got back:
              <p>
                <textarea style="border:none;width:100%;height:100px;">${$.html()}</textarea>
              </p>`;
    }

    helper.success('You did it!');
  } catch (e) {
    helper.fail(e);
  }
};
