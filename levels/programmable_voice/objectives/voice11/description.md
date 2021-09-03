# Redirector's Cut

At any point in your TwiML, you can immediately switch to another set of TwiML instructions. You can do this by using the [`<Redirect>` verb](https://www.twilio.com/docs/voice/twiml/redirect). When a `<Redirect>` is encountered, control immediately transfers to the new TwiML, that means any TwiML statements occurring _after_ the `<Redirect>` will not occur.

Imagine the following application:

_Hosted at_: https://twimlionaire.com/hello-world

```xml
<Response>
    <Say>Hello World!</Say>
    <Redirect>/hello-cloud</Redirect>
    <Say>A redirect has occurred</Say>
</Response>
```

_Hosted at_: https://twimlionaire.com/hello-cloud

```xml
<Response>
    <Say>Hello Cloud!</Say>
</Response>
```

To open this chest, check all the lines that would be spoken when the application is executed.
