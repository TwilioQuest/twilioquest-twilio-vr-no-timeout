# The World is Calling - Say Hello

Your first task with the [Programmable Voice API](https://www.twilio.com/docs/voice) will be to [configure your Twilio number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to respond to incoming calls. When your number receives an incoming call, Twilio sends an HTTP request to a URL you [specify in your phone number configuration page](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>). That URL must then return [TwiML](https://www.twilio.com/docs/voice/twiml) in response that gives Twilio instructions on how to handle the incoming call.

In this objective, use a [TwiML Bin](https://www.twilio.com/console/twiml-bins) to write some TwiML that uses the `<Say>` TwiML tag ([docs](https://www.twilio.com/docs/voice/twiml/say)) to speak the phrase `"Hello World!"` to your caller. [Configure your Twilio number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to use this TwiML bin to handle incoming calls.

Next thing you know, you'll be saying hello to some experience points!
