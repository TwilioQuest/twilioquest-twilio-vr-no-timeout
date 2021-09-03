# Come Out and &lt;Play&gt;

The `<Play>` TwiML tag ([docs](https://www.twilio.com/docs/voice/twiml/play)) will play an audio file to your caller. You can use this for things like playing hold music, or using custom pre-recorded voice greetings. To prevail in this challenge, you must configure the app you're using with [your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to use the `<Play>` tag. If you need an audio file to use with your code, may we suggest the following?

```bash
http://demo.twilio.com/docs/classic.mp3
```

If you use the audio file above, **make sure to call your number first** for... testing purposes. When your number's voice URL returns TwiML that uses the `<Play>` tag, click the *HACK* button.
