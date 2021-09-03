# Nice Mustache

To complete this objective, you must learn how to include information from an incoming voice call dynamically, and then use that information in your response.

## Mustache templates

TwiML Bins provide a way to create placeholders that can contain dynamic information with the Mustache templating language.

Mustache lets you define a placeholder, or **tag**, by surrounding your key in double mustaches: `{{ }}`. If you turn your head sideways, you'll see how the library got its name. The curly brace, `{` looks a lot like a mustache.

You can include any tag in your TwiML and Mustache will replace it with the corresponding value.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We have got the perfect job for you in {{ ToCity }}</Say>
</Response>
```

When used as an incoming call handler, `ToCity` will be replaced with the name of the city the caller lives in.

## Use the incoming request

There are [a lot of values that are available from the incoming call](https://www.twilio.com/docs/voice/twiml#request-parameters). You can make use of any of those in your template.

Remember these are case sensitive, so `{{ from }}` all lower-cased, is a different value than what you want, which is the title cased `{{ From }}`.

You can also add custom values.

## Add custom values

In addition to populating your available values from the incoming HTTP POST request, you can also add additional values. You do this by using a query string, which  is the part of the URL that comes after the `?` and are `key=value` pairs separated by an `&`.

For instance, the URL `https://techrecruiter.us?FirstName=Bob&LastName=Blahblah` has a query string that contains both `FirstName` and `LastName` values. If this URL was a TwiML Bin, you could replace those values with placeholders.

### Create the TwiML Bin

Let's first create a new TwiML Bin for this exercise.

Head over to your [console](https://www.twilio.com/console) and, from the side menu, choose [TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins). From here, you can create a new TwiML bin by using `+` button.

We're going to be using templates, so let's set the **Friendly Name** to `Mustache Example`. Let's make this TwiML Bin greet the person dynamically and tell the caller where their call is coming from.

That TwiML should look something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello {{ Name }}! This call is coming from {{ From }}</Say>
</Response>
```
Click the **Create** button to save your  new TwiML bin.

You may have noticed that we still need to pass in that `Name` parameter.

At the top of the page for the bin you just created you'll find a field labeled **URL**. Click the copy link at the end of that field to copy the URL to your clipboard.

## Wire up the URL

Locate your [Phone Number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>).

In the **Voice & Fax** section under **A Call Comes In** select **Webhook** and paste in  your TwiML bin URL.

At the end of URL append the query string `?Name=` and then **type** your name on the right side of the equals. This will allow Mustache to replace the `{{ Name }}` tag with your name.

Don't forget to **Save** your phone number with the changes.

## Give yourself a call

Now call your phone number (<%= env.TQ_TWILIO_NUMBER.value %>). You should hear your name and then a pretty silly reading of your phone number.

Great job using templates to make your message change dynamically! Press the **HACK** button when you are ready to rock!

## Learn More

- [TwiML Bins tutorial](https://www.twilio.com/docs/runtime/tutorials/twiml-bins)
