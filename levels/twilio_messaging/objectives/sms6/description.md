# I Got a Lot On My Tem-plate Right Now

Use the [Mustache templates](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#nice-mustache) feature of TwiML Bins to make the body of your reply messages more dynamic. [Configure your Twilio number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to use a TwiML Bin to respond to an incoming message (if it's not already). Using templates in your TwiML Bin, the body of the `<Message>` tag can be:

```html
Message from {{From}}: {{Body}}
```

Combine this feature with the `to` attribute of the `<Message>` tag. Set `to` to be your own mobile phone number. Now, any SMS sent to your Twilio number will be forwarded to your personal mobile number! Once you have set this up, click the *HACK* button and we will validate that your number is ready for forwarding action.
