# Say Hello

In order to complete this mission, you must handle an incoming phone call to your Twilio phone number. Your application will greet the caller with the spoken words "Hello, World!"

We'll walk through the commands you're expected to send, how to provide them to us, and finally, we'll wire it up to your phone number so that it responds when called.

## Introducing TwiML

TwiML, Twilio Markup Language, defines how you would like your application to flow. It looks and feels an awful lot like HTML, HyperText Markup Language, which is used in your web browser to display different elements.

Here's some example HTML:

```html
<html>
  <head>
    <title>Hello World, HTML version</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

Elements are defined using
- Opening tags
- The name of the element surrounded by `<` and `>`
- Closing tags, which surround the name with `</` and `>`

Notice how you can nest elements within other elements. For instance the `head` element is nested in the parent `html` element, and `title` is nested in the `head` element.

As you'll see, TwiML is similar. Here is the TwiML necessary to speak the phrase "Hello, World!":

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello, World!</Say>
</Response>
```

All TwiML Voice Responses must start with a `<Response>` tag. All other tags are nested inside that tag.

The [`<Say>` Verb](https://www.twilio.com/docs/voice/twiml/say) will perform TTS, text to speech, on the value included between the tags.

You probably noticed the `<?xml` declaration at the top of the TwiML code snippet. XML, or eXtensible Markup Language, is a tag based markup language, of which TwiML is a superset. Essentially what this line is declaring is that we agree to follow the rules of XML. That is to say, we agree to opening and closing tags that match in a case-sensitive manner. Therefore, case matters – `<Response>` is considered a different tag than `<RESPONSE>`.

## Set up your phone number

We now know the TwiML we need, so let's get it wired up to your phone number so that it will run when a call is received.

Go to the [phone number section in your console](https://www.twilio.com/console/phone-numbers/incoming), and choose your number <%= env.TQ_TWILIO_NUMBER.value %>.

Under the **Voice & Fax** section, you'll see a prompt labelled **A call comes in** followed by two fields. You have a few options here...

You could, if you were feeling up to it, spin up a web server and host a page that rendered the TwiML that will handle your call. If you chose this option, you'd choose **Webhook** from that first dropdown and then enter the URL to where Twilio could find that TwiML you were rendering.

A simpler option is to let us host your TwiML response for you. Twilio offers a service called TwiML Bins that will save you the hassle of getting a webserver up and running. TwiML Bins are an ideal solution since the response we plan to send will be static – that is, it will never change. For this option, choose **TwiML Bin** from the first drop down. Next, you'll want to click the **plus** button to make a new bin.

After this, your TwiML Bins will show up in the **Select a TwiML Bin** drop down.

## Create your TwiML Bin

Give your new TwiML Bin a **Friendly Name** – this will be what we select later in the dropdown. Next, you can either type the necessary TwiML or just copy it from the code sample above.

As long as you've typed everything in correctly, you'll see a notification letting you know that you've entered Valid Voice TwiML.

Click the **Create** button to save your TwiML Bin, and then make sure you **Save** your phone number configuration.

## Give yourself a call

Now that you've got your phone number [<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) all wired up, you should give it a call. Hello, world indeed!

Why don't you press the **HACK** button, so we can get you through this barrier, and onto the next one!
