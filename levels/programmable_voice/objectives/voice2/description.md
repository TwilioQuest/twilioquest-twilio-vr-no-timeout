# International App of Mystery

To prevail in this objective, you must add the `language` attribute to your `<Say>` tag ([docs](https://www.twilio.com/docs/voice/twiml/say#attributes-language)). Your text-to-speech messages will then interepret your text using the correct language.

Configure the TwiML you're using for [your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to return a `<Say>` tag which uses a valid value for the `language` attribute. You can test it out (for Spanish) using the text `hola, mundo`. You can specify `es-US` as the language attribute. You might also consider trying different `voice` attributes, like `Polly.Miguel` which uses [Amazon Polly](https://www.twilio.com/docs/voice/twiml/say/text-speech#amazon-polly) for text-to-speech.

Once you have configured your number with a new language, click the *HACK* button.
