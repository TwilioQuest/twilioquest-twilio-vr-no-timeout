module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const { rejectedNumber } = helper.validationFields;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;
    if (!number.voiceUrl) {
      throw `Looks like you still need to set the "On incoming call" field values for your phone number ${phoneNumberLink}.`;
    }
    if (!rejectedNumber) {
      throw 'Make sure you fill out the field for what number you are expecting to be rejected';
    }
    const numbers = [helper.fakeNumber, rejectedNumber];
    const calls = numbers.map(num =>
      helper.fakeCall(number.voiceUrl, number.phoneNumber, num)
    );
    const $responses = await Promise.all(calls);
    if ($responses[0]('Reject').length !== 0) {
      throw `Uh oh! I called from ${
        numbers[0]
      } but it was rejected! You should only reject ${numbers[1]}.
              Make sure you've wired ${phoneNumberLink} up with your webhook`;
    }

    if ($responses[1]('Reject').length === 0) {
      throw `Uh oh! When I called ${
        numbers[1]
      } I wasn't rejected, but I should've been.
              Make sure you've wired ${phoneNumberLink} up with your webhook`;
    }

    if ($responses[1]('Reject[reason="busy"]').length === 0) {
      throw `Make sure to set the reason attribute to busy.`;
    }

    if ($responses[0]('Say').length === 0) {
      throw `Don't forget to say something if the "Hello my trustworthy friend" if the call isn't rejected.`;
    }

    helper.success('Way to reject the urge to give up on this challenge!');
  } catch (e) {
    helper.fail(e);
  }
};
