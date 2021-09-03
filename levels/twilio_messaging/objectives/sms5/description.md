# Bin There, Done That

When you receive an incoming SMS to your Twilio number, you can tell Twilio how you'd like to respond using [TwiML](https://www.twilio.com/docs/sms/twiml). You can generate TwiML dynamically from your own server, but you can also use a [TwiML Bin](https://www.twilio.com/console/twiml-bins) to quickly set up instructions for replies that don't need a lot of backend logic.

To complete this objective, [configure your Twilio number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to use a TwiML Bin to send back a simple reply using the `<Message>` TwiML tag. The contents of the message can be anything you like. Once you have configured your number to respond to incoming messages using the instructions in your TwiML Bin, click the *HACK* button. We'll check your number to make sure it's working!
