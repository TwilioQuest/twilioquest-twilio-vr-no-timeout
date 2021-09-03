# Feeling rejected

You can programmatically decline a call by using the [`<Reject>` TwiML verb](https://www.twilio.com/docs/voice/twiml/reject). You can even set a reason, which will change the experience for the caller. Setting the `reason` attribute to `"busy"` will cause a busy signal to occur. Leaving `reason` blank or setting it specifically to the default of `"rejected"` will play a standard not-in-service response.

You do not have to pay for calls that are `<Reject>`ed, so this is a good way of dealing with possible incoming spam calls.

In order to crack open this chest, you must block a specific number. First, decide on a number that your code will reject, and then write code to conditionally block that number. Once you've tested it, enter that number into the **HACK** interface and grab your XP and sweet sweet loot!
