# Setting up a fallback handler

In order to unlock this chest, you'll need to set up a way to handle errors that could make your SMS application unavailable. If your application is down, it's a good idea to have a backup message that gently lets people know that your application is running into difficulties (but that you're working on it, of course!).

We'll walk through best practices, how to setup your callback, and then review how to use the [Message Verb](https://www.twilio.com/docs/sms/twiml/message) from a hosted TwiML Bin.

## What is a fallback?

As a developer, it's a best practice not only to anticipate, but also prepare for errors. This is usually done through some sort of mechanism, typically called a "fallback." Most programming languages have some sort of keyword along the lines of `try` and `catch`. The logic being: try some code, if it doesn't work, catch the error and handle it for your user. You fallback to the error handling case.

Twilio provides this functionality for you as a developer around incoming messages.

## Errors are inevitable, alas.

Just like in real life, mistakes happen. Some of these mistakes, such as malformed TwiML, can take down your application. When Twilio reaches out to your application, expecting some TwiML instructions, it won't know how to handle an error that has "bubbled up" from code.

Why else might you want a backup plan? Maybe the network is slow, and your server can't provide a response in a timely manner. You don't want to leave the person sending the message waiting indefinitely!

## Okay, I'm sold. How do I create a fallback?

On the edit screen for your Phone Number, under the **Messaging** section, you'll find a field called `Primary Handler Fails` (underneath the "A message comes in" handler that you set in a previous barrier).

- In the dropdown menu, select "TwiML"
- Click the `+` (plus) button that appears to create a new TwiML bin
- Give it a friendly name, perhaps something like "Backup Message bin"
- Add your TwiML instructions to send your backup message

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>We're sorry. We are currently experience difficulties. Please try again later. 🍰 </Message>
</Response>
```

(The conciliatory slice of cake emoji 🍰 is, of course, optional.)

Once you see the `Valid Messaging TwiML` verification, hit **Create** to save your new backup TwiML bin.

Finally, make sure to hit the **Save** button in the edit screen for your Phone Number to save your changes.

## Let's break some stuff!

Alright, if you want to verify that your backup handler are working, you should purposefully break the TwiML bin that handles an incoming message. This will cause Twilio to look at the TwiML bin that you set under "Primary Handler Fails." An easy way to invalidate your primary TwiML instructions is to make the "On Incoming Response" TwiML's `<Response>` tag all lowercased `<response>`. **Save** that change temporarily, and then send an SMS to your phone number.

Did you receive your backup message as a reply? This is one time you'll be excited to see an error message.

Now you should enter your number over in the field and press the **HACK** button to be on your conscientious developer way!

(Don't forget to **fix** your primary TwiML bin. Backup plans are great, but they should be just that--a backup.)
