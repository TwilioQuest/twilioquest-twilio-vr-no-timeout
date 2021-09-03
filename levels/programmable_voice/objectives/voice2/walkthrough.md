# Speak easy

To pass this barrier, you're going to need to unlock the skill of speaking to your caller in a language other than English. The [`<Say>` TwiML Verb](https://www.twilio.com/docs/voice/twiml/say) provides access to many different languages and voices.

Using the right voice for the task allows you to customize your user's experience. When communicating in a different language, it's essential to use the right voice character to provide your application with cultural authenticity.

## Say attributes

Most TwiML elements provide configuration options. Typically this is done using **attributes**. Each `TwiML` tag has a predefined set of attributes. For instance, the `<Say>` tag allows you to set a [`language`](https://www.twilio.com/docs/voice/twiml/say#attributes-language) attribute.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-MX">Hola, mundo</Say>
</Response>
```

Note how the attribute name, `language` is followed by an equals sign `=` and then a double quoted value, in this case `"es-MX"`.

Twilio's TwiML supports [many languages](https://www.twilio.com/docs/voice/twiml/say#attributes-language). The TwiML example above uses `es-MX`. The `es` is for Español and the `MX` selects a dialect from Mexico.

Go ahead and set up your incoming call to respond with this TwiML. You'll notice that a new default voice, based on the language we specified, jumped in to save the day.

## Amazon Polly

Amazon Polly's fluid pronunciation of text helps you deliver high-quality voice output for a global audience.

To complete this task, we need to use Amazon Polly's `"es-US"`, or Latin American locale, and choose the voice of `"Miguel"`.

In order to specify a voice in your TwiML, you'll need to use the **voice** attribute.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-US" voice="Polly.Miguel">Hola, mundo</Say>
</Response>
```

Write the code above in a new TwiML Bin and [wire that up to your Incoming Call Handler on your number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>)

## Hear your new voice

Go ahead and give your phone number a call (<%= env.TQ_TWILIO_NUMBER.value %>). Mucho gusto Miguel! Hola mundo, indeed!

Now you should press the **HACK** button so we can get you through this barrier and move on to your proxima adventure!
