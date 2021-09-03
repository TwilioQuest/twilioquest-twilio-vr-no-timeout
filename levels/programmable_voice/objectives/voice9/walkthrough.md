# Freedom of speech

To open this chest, you must gather input from a caller using speech, as opposed to gathering the DTMF tones. Speech provides a user friendly hands-free approach to using an Interactive Voice Response, IVR, system.

`<Gather>`ing speech is possible with some additional parameters.

## Input

There is a parameter that is available on `<Gather>` named `input`. The default is `dtmf`. You can set it to `speech` or `dtmf speech` to accept both.

When gathering input from the user, a best practice is to inform them of what options they have available.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="https://is-a-hotdog.net/sandwich.php">
        <Say>A hotdog is a sandwich. Is this statement true? Please answer yes or no.</Say>
    </Gather>
</Response>
```

Once the caller stops talking for 5 seconds, the `<Gather>` will POST to the associated `action`. That post will contain field value named `SpeechResult` that contains the transcription of the voice request.

## Hints

In order to help the flow of your application, a best practice is to include `hints` which will help `<Gather>` to determine what the caller is most likely saying. The hints are separated by a comma.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="monday,tuesday,wednesday,thursday,friday">
        <Say>Which day of the week is your favorite? You can say any day of the week Monday thru Friday.</Say>
    </Gather>
</Response>
```

This example helps to recognize those specific words, it's possible that your caller will say something else, but this helps set the model that your application is expecting.

## Writing the TwiML

Armed with `input` and `hints`, we are ready to create the TwiML portion of the required. To do this, first, create a new [TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins). Then write your code to gather information from the prompt:

**What would you like to do? You can say things like: hours, reset, or agent.**

If you need help, check out the spoiler. You've got this!

<details>
    <summary>Spoiler: The TwiML Bin solution</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="hours,reset,agent">
        <Say>What would you like to do? You can say things like: hours, reset, or agent.</Say>
    </Gather>
</Response>
```

NOTE: We haven't yet built the `action` to handle the response. We'll do this next!

</details>

## Handling the action

To complete this chest, you'll need to handle the request from Twilio. One way we can do this is to use a serverless solution like a Function. First,[create a new Function](https://www.twilio.com/console/runtime/functions/manage) and choose the _Blank_ template.

The concept here is that we want to inspect what was submitted. This value can be found in `event.SpeechResult`. A common solution is to use a [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) on this value, and then handle each case specifically.

The following is what should happen for each result:

_reset_: `<Say>` "Your pin has been reset"
_hours_: `<Say>` "Our hours are 9 to 5"
_agent_: `<Say>` "Connecting you to our next available agent"

After you write the function, **Save** it and **Copy** the URL and **Paste** it into your `<Gather>` `action` parameter. NOTE: If you want to debug the function, remember using `console.log` statements will cause the Logs section on the Function page to contain your messages. This is handy when dealing with Speech!

Need help writing the function? Check out the spoiler.

<details>
    <summary>Spoiler: The Function solution</summary>

```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  switch (event.SpeechResult.toLowerCase()) {
    case 'agent':
      twiml.say('Here is an agent');
      break;
    case 'hours':
      twiml.say('Our hours are 9 to 5');
      break;
    case 'reset':
      twiml.say('We have reset your pin');
      break;
    default:
      console.log(
        `I heard ${event.SpeechResult} at a confidence rating of ${Math.round(
          event.Confidence * 100
        )} percent`
      );
  }
  callback(null, twiml);
};
```

NOTE: Since the `console.log` is in the `default` branch of the `switch` statement, it will only run when all of those other options miss.

</details>

## Verifying it works

Wire up your [incoming phone number (<%= env.TQ_TWILIO_NUMBER.value %>)](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) to your TwiML Bin and give it a jingle. Answer with each of the different options. Do you get the correct answer each time ? Remember, if you are having problems, check out your logs to see the transcription.

Once you're happy with your results, press the HACK button!
