module.exports = async function(helper) {
  // Number of characters in the expected e.164 format
  const US_BASED_LENGTH = 12;
  const INTL_LENGTH = 13;
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const { prefix } = helper.validationFields;

  if (!prefix || !prefix.startsWith('+') || prefix.length < 1) {
    return helper.fail(`
      Please enter the prefix you are checking for, including the leading "+"
      sign for international formatting. e.g. "+1651"
    `);
  }

  const prefixWithoutPlus = prefix.replace('+', '');
  const newPrefix = parseInt(prefixWithoutPlus);

  if (isNaN(newPrefix)) {
    return helper.fail(`It looks like this prefix is not a number.`);
  }
  
  const prefixedNumber = `${prefix}8675309`;
  const notPrefixedNumber = `+${newPrefix + 1}8675309`;



  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;

    if (!number.voiceUrl) {
      throw `Looks like you still need to set the "On incoming call" field values for your phone number ${phoneNumberLink}.`;
    }

    const check = num => {
      return helper.fakeCall(number.voiceUrl, number.phoneNumber, num);
    };
    const $sameTwiml = await check(prefixedNumber);
    const $differentTwiml = await check(notPrefixedNumber);
    if ($sameTwiml('Say').text() === $differentTwiml('Say').text()) {
      throw `
        Well this is awkward. I simulated a call from "${prefixedNumber}", but
        I received the same response I got from fake-calling 
        "${notPrefixedNumber}". Is "${prefix}" really the prefix
        your code is checking for? Double check the function wired up 
        to ${phoneNumberLink}!`;
    }

    helper.success('Way to keep the fun in function!');
  } catch (e) {
    helper.fail(e);
  }
};
