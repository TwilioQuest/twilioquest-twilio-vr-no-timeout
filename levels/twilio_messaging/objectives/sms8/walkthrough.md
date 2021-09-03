# Using the &lt;Redirect&gt; Verb

Messaging TwiML has one more trick up its sleeve: The `<Redirect>` verb. To acquire the loot inside this chest, you'll pass control of a Message response to a second webhook URL that will also return TwiML.

When you use the `<Redirect>` verb in your TwiML instructions, you are telling Twilio to make another HTTP callback to a different URL. (This is not the same as forwarding the Message, as we saw with the `<Message>` verb's `to` attribute.) Just like the `<Message>` verb, the `<Redirect>` verb lives inside of a pair of `<Response>...</Response>` tags:

```
<Response>
  <Message>Ahoy there!</Message>
  <Redirect>https://www.foo.com/nextInstructions</Redirect>
</Response>
```

You could use `<Redirect>` to compartmentalize some of the logic in your Message Response and build more complex application. For example, the first URL (the one you set in the Console) might send back a `<Message>` and then use the `<Redirect>` verb to pass the Response control to a different set of TwiML instructions.

It is important to note that instructions after `<Redirect>`, including `<Message>`, will be ignored because control passes to another webhook.

## Absolute and Relative URLs

The "noun" of the `<Redirect>` verb is a URL for a different TwiML document. Twilio will make a request to this URL and expect TwiML in response.

The URL can be either **absolute**: `<Redirect>http://www.foo.com/nextInstructions</Redirect>`

or it can be **relative** to the current URL: `<Redirect>/nextInstructions</Redirect>`

## Using the Twilio Client to `<Redirect>`

The examples you saw above used "raw" TwiML with `<Redirect>` verb tags. If you use one of Twilio's server-side helper libraries, you can call one of the built-in methods to generate the `<Redirect>` verb tags for you. For example, in Node.js, sending a text with "Hello World!" and passing response control looks like:

```
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

```

In Python, the syntax is different, but the results are the same:

```
from twilio.twiml.messaging_response import Message, Redirect, MessagingResponse

response = MessagingResponse()
response.message("Hello World!")
response.redirect('https://demo.twilio.com/welcome/sms/')
```

Twilio is flexible; it just expects your webhook URL to return TwiML. How you generate it is up to you. When you practice with the `<Redirect>` verb, you can write it whichever way makes sense to you (or even both).

## Try it out!

You have many options for `<Redirect>`-ing between different possible webhooks: TwiML Bins, Twilio Functions, and your own hosted code that you write in the QuestIDE or another application. In fact, try chaining together more than one. If you use a TwiML Bin, you can write raw TwiML and pass of control to another TwiML Bin or to a function or your own hosted code with a `<Redirect>`.

Wire up some TwiML in the method of your choice (TwiML Bin, Function, web application) that uses the `<Redirect>` verb. If you use the QuestIDE, a basic web application with one route has been created for you. Make sure to update the first route to include `<Redirect>` TwiML and then create a second route that returns a second `<Message>`.

After you create your `<Redirect>` TwiML, configure your Phone Number to call your webhook URL when you receive an incoming SMS. When you've tested that it works, enter your Twilio Phone Number in the Hack interface and hit **HACK**. We'll check that your webhook URL returns `<Redirect>`, and if so, the chest will pop open to reveal the loot within!
