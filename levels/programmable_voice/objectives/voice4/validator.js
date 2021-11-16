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
    const $plays = $('Response > Play');
    if ($plays.length < 1) {
      throw `Whoops you need to use the Play verb in your TwiML wired up to ${phoneNumberLink}!`;
    }
    const audioUrl = $plays
      .eq(0)
      .text()
      .trim();
    if (!audioUrl || audioUrl === '') {
      throw 'Please make sure you include a url in your Play verb';
    }
    const response = await helper.fakeRequest(audioUrl, {}, undefined, 'GET');
    if (response.status >= 400) {
      throw `Oh no, please link to a valid audio file. ${audioUrl} returned a ${
        response.status
      }.`;
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType.toLowerCase().startsWith('audio')) {
      throw `Oh no, it looks like ${audioUrl} is not an audio file. It is of type "${contentType}"`;
    }

    helper.success(`
      You did it! We knew you would never give us up, or let us down.
    `);
  } catch (e) {
    helper.fail(e);
  }
};
