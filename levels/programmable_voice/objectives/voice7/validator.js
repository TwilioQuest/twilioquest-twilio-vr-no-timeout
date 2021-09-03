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
      helper.fakeNumber
    );
    
    // Find Gather
    if ($('Gather').length === 0) {
      throw `Make sure you include the &lt;Gather&gt; verb in your TwiML wired up to ${phoneNumberLink} `;
    }
    // Ensure Say is nested inside
    if ($('Gather Say').length === 0) {
      throw `Don't forget that you should nest your &lt;Say&gt; verb inside the &lt;Gather&gt; in your TwiML wired up to ${phoneNumberLink}.`;
    }

    // Grab action, if present - otherwise loop
    let actionUrl = $('Gather').attr('action');
    if (!actionUrl) {
      actionUrl = number.voiceUrl;
    }

    // Test the action URL
    const inputString = '123*';
    const $action = await helper.fakeCall(
      actionUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { Digits: inputString }
    );

    // Ensure the response contains a <say> tag with text that contains the
    // input string
    let found = false;
    $action('Say').each((i, elem) => {
      const t = $action(elem).text();
      if (t.includes(inputString)) {
        found = true;
      }
    });

    if (!found) {
      throw `
        After your initial Gather collects Digits, your next response (the
        "action" for the Gather) should contain a Say tag which echoes back
        the Digits that the caller entered. We didn't find a Say tag like
        that in your response.
      `;
    }

    helper.success('Way to gather your thoughts!');
  } catch (e) {
    helper.fail(e);
  }
};
