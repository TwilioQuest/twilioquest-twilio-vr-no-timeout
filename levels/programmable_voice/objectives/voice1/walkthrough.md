# Handler With Care

To unlock this chest, you'll need to set up a way to handle errors that might occur within your Voice application.

We'll walk through best practices, show you how to set up your callback, and then review how to use the [`<Say>` Verb](https://www.twilio.com/docs/voice/twiml/say) from a hosted TwiML Bin.

## Errors are inevitable

No one is perfect...not even Cedric. Chances are, at some point, there is going to be an error in your code.

There are also circumstances that are out of your control. For instance, if you are responding from your own server, maybe it won't provide a response in a timely manner. You don't want to leave your caller just waiting indefinitely, you want to provide a fallback.

Most programming languages have a built-in fallback mechanism – some sort of keyword along the lines of `try` and `catch`. The logic being: try some code and, if it doesn't work, catch the error and handle it for your user.

Twilio provides this functionality for you on incoming calls.

## Create your fallback

On the edit screen of your [<%= env.TQ_TWILIO_NUMBER.value %> Phone Number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>), under the **Voice & Fax** section, you'll see a field labelled `Primary Handler Fails`. Choose TwiML from the first dropdown, then create a new TwiML Bin by clicking the plus button on that row.

Name your TwiML Bin something like `Please Call Again`. Add some TwiML in the body to do text-to-speech like so:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We are currently experiencing difficulties. Please call again.</Say>
</Response>
```

Assuming you aren't currently experiencing difficulties 😉, you should see a `Valid Voice TwiML` verification. Click **Create** to save your new TwiML Bin and then **Save** your number configuration.

## Make sure it works when other things don't

To verify that your error handling works, you should go ahead and mess up your incoming TwiML on purpose. My favorite way to do that is to purposefully make the "A Call Comes In" TwiML `<Response>` tag the all lowercased `<response>`. **Save** that change temporarily, and then give your phone number a call. Nice work! Now go **fix** your incoming call handler!

Now you should press the **HACK** button, so we can get you to crack open this chest and move on to your next adventure!
