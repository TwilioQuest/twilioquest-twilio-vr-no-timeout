# Pin it to win it

The [`<Gather>` TwiML verb has quite a few options](https://www.twilio.com/docs/voice/twiml/gather) that will let you guide your caller's experience. A best practice is to inform the caller of the number of digits that they are supposed to enter, and then automatically continue after they have entered those digits.

A common example of this is where something is said like **"Please enter your 4 digit pin"**. This clearly states how many digits are expected. However without any additional coding, the 5 second wait of `<Gather>` would still occur. To fix this, you can limit the number of digits that you accept. You do this with the `numDigits` attribute on the `<Gather>` verb.

To open this chest gather a 4 digit pin from the caller, by setting the `numDigits` attribute to 4.
