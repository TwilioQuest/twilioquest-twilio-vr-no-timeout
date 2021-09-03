# Put the "Fun" in Function!

[Twilio Functions](https://www.twilio.com/console/functions/manage) allow you write [Node.js](https://nodejs.org/en/) code that runs in Twilio's infrastructure. You can use Functions to create a dynamic TwiML response for incoming messages.

The **Help** section contains example code for an SMS-based [magic 8-ball](https://en.wikipedia.org/wiki/Magic_8-Ball). Deploy this code as a [Twilio Function](https://www.twilio.com/console/functions/manage), and [configure your Twilio number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to handle incoming messages using this function. Once you have deployed your magic 8-ball function and tested it out, click the *HACK* button. Without a doubt, you will prevail in this challenge.
