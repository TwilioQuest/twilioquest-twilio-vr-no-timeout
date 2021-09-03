# You Can Say That Again

To open this chest, you're going to pick up the ability to repeat what you say. The `<Say>` [TwiML Verb](https://www.twilio.com/docs/voice/twiml/say) provides an attribute named [`loop`](https://www.twilio.com/docs/voice/twiml/say#attributes-loop) which causes the `<Say>` speech to repeat for that many times.

## Extra treasure: Infinite loops

A special `loop` value of `0` will cause your text-to-speech to repeat forever until the caller hangs up. My kids have this set up with the text of `"Are we there yet?"`.

## Set up the loop

Let's give this a try. We'll set our TwiML up to repeat the quote:
**Anything worth doing is worth doing twice.**

And of course, we'll say that...twice.

For your [incoming call handler](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>), make sure that the TwiML you return uses the `loop` value.

If you need help, click to open the spoiler below.

<details>
    <summary>Spoiler: The TwiML code</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say loop="2">Anything worth doing is worth doing twice.</Say>
</Response>
```

</details>

Don't forget to **Save** your Phone Number settings!

## Test it out

Go ahead and give your phone number (<%= env.TQ_TWILIO_NUMBER.value %>) a call. If you hear the quote twice, you got it!

Now you should press the **HACK** button, so we can crack open this chest and continue your journey!
