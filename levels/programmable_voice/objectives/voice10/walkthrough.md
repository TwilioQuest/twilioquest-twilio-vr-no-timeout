# &lt;Dial&gt;ed In

It's possible to make an external call in the middle of your application using the `<Dial>` TwiML verb. A common use case is to use this functionality for call forwarding.

## Dial TwiML Verb

The `<Dial>` verb body accepts a phone number in [e.164 format](https://www.twilio.com/docs/glossary/what-e164). To create TwiML that automatically dialed the number `(202) 555-0136` you'd return TwiML like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>+12025550136</Dial>
</Response>
```

## Completing the hack attempt

You've got the raw materials to get this done - the rest is up to you. The high level steps are as follows:

* Create a web application / Function / TwiML Bin that uses the `Dial` tag to forward an incoming call to `+19473334160`.
* Ensure that application is set up to handle incoming calls for [your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>).
* Test your number!
* When you are confident that it works, hit the *HACK* button.
