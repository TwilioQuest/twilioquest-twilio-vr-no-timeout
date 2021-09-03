# Pin it to win it

To crack open this chest, you'll need to design a more thoughtful user experience, for a pin entry system. User experience is important. You want to make sure you provide clear instructions about what you are expecting from your caller. A best practice is to inform your caller of how many digits you would like them to enter.

In addition to informing your caller, it's also a good idea to limit the `<Gather>` request to that number of digits. You can do this with the `numDigits` parameter of `<Gather>`.

## Without limits

The [`<Gather>` TwiML verb](https://www.twilio.com/docs/voice/twiml/gather) without any additional configuration will wait for 5 seconds after the child TwiML completes before submitting the results. By default, you can also press `*` to submit and avoid the wait. Think of that like the enter key. You can actually override this using the [`finishOnKey`](https://www.twilio.com/docs/voice/twiml/gather#finishonkey) attribute.

One way to short circuit this is to use the [`numDigits`](https://www.twilio.com/docs/voice/twiml/gather#numdigits) attribute. Adding this submits the `Digits` as soon as that number of digits were entered.

## Writing the TwiML

We're going to prompt our caller by saying "Please enter your four digit pin." To do this, first, create a new [TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins). Then write your code to gather **exactly** 4 digits from your caller. If you need help, check the spoiler. You've got this!

<details>
    <summary>Spoiler: The TwiML Bin solution</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather numDigits="4">
        <Say>Please enter your four digit pin</Say>
    </Gather>
</Response>
```

</details>

## Verify it's working

Wire up that TwiML Bin to the "A call comes in" handler of your number ( [<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) ). Give it a call and enter 4 digits. You'll notice that we've created that dreaded `<Gather>` loop because we never declared an `action`. Don't sweat it for this chest, but do remember that no action means looping this should you encounter this problem again!

Press that **HACK** button to grab your loot!
