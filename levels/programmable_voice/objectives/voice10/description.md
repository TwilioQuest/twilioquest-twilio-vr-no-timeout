# This &lt;Dial&gt; Goes to 11

Configure [your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) to forward an incoming call to `+19473334160`. Use the `<Dial>` tag ([docs](https://www.twilio.com/docs/voice/twiml/dial)) for this purpose. We've provided a stub of an application you can use in the **code editor**, but this time let's see if you can fill in more of the blanks yourself. You can also complete this challenge with your own code or TwiML Bins.

To pass validation, your [phone number's voice URL](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) must return TwiML that uses the `Dial` tag to forward a call to `+19473334160`. It MUST dial this specific number. When your app is ready, hit the *HACK* button.

**NOTE:** Trial accounts can only call [verified numbers](https://www.twilio.com/console/phone-numbers/verified). However, you can still write an app that returns TwiML to satisfy this challenge.