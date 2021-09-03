# You Got An Error... Fallback!

Safety is cool, and so are backup plans for your SMS application! If there's a problem with the URL handling inbound SMS messages from Twilio, you can configure a **fallback handler** to ensure your users still receive a reply when texting in to your number.

[Configure your Twilio number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to have a fallback handler. You'll see an option to configure one under the text **"PRIMARY HANDLER FAILS"**. A [TwiML Bin](https://www.twilio.com/console/twiml-bins) is a handy and reliable solution for a static fallback response.

Once you have set up your fallback handler to a URL that returns Messaging TwiML, click the *HACK* button and receive your reward!
