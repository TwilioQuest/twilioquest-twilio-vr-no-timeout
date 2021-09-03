# Expanding the TwiML-verse with and templates

You've seen TwiML and used it to respond to an incoming message, but there's more you can do with it! In the text to follow, you'll learn about the `<Message>` verb's **to** attribute and how to use templates.

## Forwarding your message to a different number

Say that you wanted to forward all incoming messages to your personal number? With TwiML's `to` attribute on the `<Message>` verb, you can specify a number to which Twilio will pass along the message.

To add the `to` attribute to the `<Message>` verb, you place it within the angled brackets:

```
<Message to="+16175551212">
```

## TwiML: Now with Mustache templates

When you set up your TwiML you can use Mustache Templates to dynamically (on the fly) update your message when it's run. [Mustache Templates](https://mustache.github.io/mustache.5.html) are so-named because of the `{{...}}` curly braces that look a bit like a handlebar mustache turned on its side.

When Twilio makes a request to your application (in this example, a TwiML Bin), you can access some of the information in the request. Take a look at the following example:

```
<Response>
	<Message>{{From}} said "{{Body}}"</Message>
</Response>
```

When Twilio looks at the TwiML instructions for how to respond to an incoming message, it will replace the `{{From}}` value with the **from** phone number and the `{{Body}}` value with the **body** of the message you received.

## Putting it all together

Create a new TwiML bin to forward an incoming message to your own cellphone number. You will need to use:

1. the `<Message>` verb and the `to` attribute
2. Mustache templating to capture the `Body` and `From` number (Hint: Take a look at the example above.)

Don't forget to configure your Twilio phone number to your new TwiML bin under the "A Message Comes In" setting.

## Testing it out

Send a message to your Twilio number, or better yet, have a friend text your Twilio number! If you've written the TwiML correctly, you should receive a text message at your own number that tells you the body and phone number from the original sender.

Once you've confirmed this step, enter your **Twilio** phone number into the interface on the right and hit the _HACK_ button to get your points!
