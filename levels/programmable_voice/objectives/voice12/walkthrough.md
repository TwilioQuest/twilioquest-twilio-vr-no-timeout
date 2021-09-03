# Feeling rejected

There may come a time where you want to disallow a call from executing your incoming call handler. Remember every incoming call costs you money, and while it's relatively small, unwanted calls may add up over time. The common use case here is stop spam calls.

Good news! If you know the caller is a spammer, you can `<Reject>` the call and will not need to pay for the incoming call. You can set the `reason` attribute to either `"busy"` or `"rejected"` to change the flow. eg: `<Reject reason="busy">`

For this chest, you'll do just that. You'll define a phone number that is a suspected spammer, and you will reject all calls from that specific number. You'll deliver them a busy signal.

## Writing the function

You can solve this challenge by using any sort of dynamic solution. Let's explore how to solve the problem using a Twilio Function.

Let's create a new function by going to your Console >> Runtime >> Functions. From here press the **+** button and choose the **Blank** template. Give the function a **Function Name** of `No spammers allowed` and a path of `/no-spammers`. Now first, think of a real number you can use to test the rejection.

The pseudo-code looks something like this:

- If the incoming number matches your pretend spam number:
  - Reject the call with a busy signal.
- Otherwise:
  - Say "Hello my trustworthy friend!"

Give it a shot using your function skills, but if you need help, please check out the spoiler.

<details>
    <summary>Spoiler - The Function Solution</summary>

Remember that the `event` object has all Twilio request values, including `From` which stores the caller's information.

```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  if (event.From === '+12095550136') {
    twiml.reject({ reason: 'busy' });
  } else {
    twiml.say('Hello my trustworthy friend');
  }
  callback(null, twiml);
};
```

All the Voice TwiML verbs are exposed off of the `VoiceResponse` object, so you can call the reject method to produce that tag. Notice how the parameters are included as a JavaScript object, the key being the attribute name, and the value being the value.

</details>

## Verifying it works

Wire up your function up to your incoming number (<%= env.TQ_TWILIO_NUMBER.value %>) and give it a call from your suspected spammer's number. You should hear the busy signal. Now, give it a jingle from another number. You should hear the spoken message.

If that's all set, go ahead and enter the spammer number and press the **HACK** button.

## Learn more

- [Tutorial - Block Spam Calls and Robocalls](https://www.twilio.com/docs/voice/tutorials/block-spam-calls-and-robocalls-node-js)
