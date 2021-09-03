# Replying to an incoming message

You've replied to a text message once already. You might not have noticed, but you used an XML dialect called **TwiML** to tell Twilio what to do when it received an incoming text.

## What is TwiML?

TwiML stands for "Twilio Markup Language," and you can think of it as a set of instructions for Twilio to do something on your behalf, such as respond to a text message or voice call.

Under the hood, TwiML is [XML](https://en.wikipedia.org/wiki/XML), which is a type of "Markup Language" to encode extra information about some data. In this case, the data is the body of the message you want to send back to the person who texted you. The extra information is the instructions for Twilio.

In the example below, look for the body of the message. Around it, you'll see a lot of information contained inside `<tags>`.

The `<Response>` tag tells Twilio that you are creating a set of TwiML instructions. Every time you respond with TwiML, you need to create a set of `<Response>`...`</Response>` tags with your message nested inside.

The [`<Message>` verb](https://www.twilio.com/docs/sms/twiml/message) is the real star of the show here. It tells Twilio that you want to send a text message back to the person who texted you.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Oh hai Mark!</Message>
</Response>
```

How about that weird line with the `<?xml...` tag? That's a declaration that we are going to be following the rules of XML, including opening and closing tags in a case-sensitive way. We include this because TwiML is XML under the hood.

## Setting up your phone number

The first step to receive an incoming SMS is to configure a URL that Twilio will request when one of your phone numbers receives an incoming text. Find [your programmable phone numbers in the console](https://www.twilio.com/console/phone-numbers/incoming), and click on one of them to configure it.

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>

On the phone number configuration page, scroll down to the configuration **Messaging** section. Look for the label **A MESSAGE COMES IN** next to two dropdown menus.

<center>
  <img src="images/programmable_sms/message_comes_in_twiml_bin.png" />
</center>

This is where you tell Twilio how it should expect to receive TwiML instructions. You have several options for returning TwiML, such as spinning up a web server to provide the TwiML. We'll get there, but this barrier is all about getting familiar with the TwiML itself.

Twilio provides a service called "TwiML Bins" to hold and return the TwiML instructions for you. (This means you don't have to set up and run a webserver to host the TwiML!) When you want to set up a static response, TwiML bins are a great solution.

In the first dropdown, select **TwiML** and then hit the "+" (plus) button on the right to create a brand new TwiML bin. Any previously created TwiML bins will appear in the dropdown on the right, but we'll be making one from scratch for this objective.

You can also create TwiML bins in the [TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins) section of the Twilio Console.

## How do I TwiML bin?

Think of a TwiML bin as a little bucket to hold a specific set of TwiML instructions.

First, give your new bin a **Friendly Name** to identify it, something like "My first Messaging TwiML bin."

In the TwiML text box, you can write some TwiML instructions for how to respond. Notice that the `<?xml...` declaration has already been added for you. You can either write the TwiML by hand or copy from the example above.

## Check your work

You've created a TwiML bin and told Twilio to use that set of instructions to reply to an incoming message on your Twilio Phone Number. Time to test it out!

Send a message to your Twilio Phone Number and confirm that you get back your intended reply.

Once you receive a reply, enter your Twilio Phone Number in the field on the right and hit the **HACK** button. We'll check that you've wired up a TwiML bin to respond to an incoming message, and the XP will be yours!
