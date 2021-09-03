# You Can Say That Again

Sometimes, you need to repeat yourself in order to be heard. That's true when you're building a voice application as well. The `<Say>` tag has a `loop` attribute ([docs](https://www.twilio.com/docs/voice/twiml/say#attributes)) which you can use to repeat a message multiple times.

The objective here is to configure the TwiML app you're using [for your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to use the `<Say>` tag and the `loop` attribute together.  Answer incoming calls by saying `"Anything worth doing is worth doing twice."` ...twice. Specifically, you must set the `loop` attribute to `2`.

**You've got this! You've got this!**
