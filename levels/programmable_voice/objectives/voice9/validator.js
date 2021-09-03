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
      throw `Make sure you include the &lt;Gather&gt; verb in your TwiML wired up to ${phoneNumberLink}`;
    }
    // Ensure Say is nested inside
    if ($('Gather Say').length === 0) {
      throw `Don't forget that you should nest your &lt;Say&gt; verb inside the &lt;Gather&gt; verb in your TwiML wired up to ${phoneNumberLink}.`;
    }
    // Grab action
    const actionUrl = $('Gather').attr('action');
    if (!actionUrl) {
      throw 'Whoops make sure you define an action attribute that points to your function that handles the response.';
    }
    // Grab input
    const input = $('Gather').attr('input');
    if (!input || input !== 'speech') {
      throw `
        In order to gather speech you need to set the input parameter to "speech" in the TwiML wired up to ${phoneNumberLink}
      `;
    }
    const words = ['agent', 'hours', 'reset'];
    let hints = $('Gather').attr('hints');
    if (!hints) {
      throw `Make sure you set comma separated hints of what is expected in the TwiML wired up to ${phoneNumberLink}`;
    }
    hints = hints.split(',').map(hint => hint.toLowerCase().trim());
    if (hints.length < 3) {
      throw `I expected at least 3 hints, something like ${words.join(',')}`;
    }
    // Run action with 3 diff digits and verify all different...
    const calls = words.map(word =>
      helper.fakeCall(actionUrl, number.phoneNumber, helper.fakeNumber, {
        SpeechResult: word,
        Confidence: 0.99,
      })
    );
    // TODO: These will be cheerios. Use .text() or .html() to get them
    const $responses = await Promise.all(calls);
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        if ($responses[i].text() === $responses[j].text()) {
          throw `
            Hmmm...when I called and entered a '${words[i]}', 
            I got the same response as I did when I entered with '${words[j]}'. 
            That's not right, is it?
          `;
        }
      }
    }

    helper.success('Way to protect your freedom of speech!');
  } catch (e) {
    helper.fail(e);
  }
};
