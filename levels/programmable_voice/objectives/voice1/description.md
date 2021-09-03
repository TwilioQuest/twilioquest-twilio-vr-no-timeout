# Handler With Care

To complete this objective, [configure your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to have a fallback handler for voice calls if the primary handler fails. It always pays to have a "Plan B". 

A [TwiML Bin](https://www.twilio.com/console/twiml-bins) is a handy and reliable backup plan. Use the `<Say>` TwiML tag in your TwiML to speak a response to callers indicating your app is having difficulties. Once you have configured your number with a reliable backup, click the *HACK* button. If everything looks good, we'll back <i>you</i> up with some XP.
