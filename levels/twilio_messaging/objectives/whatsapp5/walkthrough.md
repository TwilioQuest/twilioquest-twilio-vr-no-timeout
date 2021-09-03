# WhatsApp Sessions and Windows

Using Twilio's API, you can send outbound messages through WhatsApp, just like sending an SMS. There is, however, one important difference with WhatsApp: Outbound messages to WhatsApp users must be sent using a pre-approved message body template.

## The magic 24-hour session

All messages sent from your WhatsApp number (or from your assigned Sandbox number when prototyping) must follow a **pre-approved** template unless a user has messaged to you first. When you receive an inbound WhatsApp message (We'll cover this in a bit.), it starts a 24-hour window or "session" during which you can see free-form session messages. In other words, after a user sends your application a WhatsApp message, you have 24 hours to use WhatsApp for conversational [back-and-forth] messaging.

The 24-hour session restarts every time a user sends you a new incoming message.

## Tell me about these templates

Right now, you're probably using the Sandbox for WhatsApp. The Sandbox comes with [three pre-approved templates](https://www.twilio.com/docs/sms/whatsapp/api#templates-pre-registered-for-the-sandbox) for sending messages that can be used for simple notification cases:

- Your {{1}} code is {{2}}.
- Your appointment is coming up on {{1}} at {{2}}
- Your {{1}} order of {{2}} has shipped and should be delivered on {{3}}. Details: {{4}}.

Remember: Responses to incoming messages give you a bit more freedom. Within a 24-hour session of receiving an incoming message, any response you send does not have to be templated. We'll see this in a later objective about conversational messaging.

## How do I fill in the templates?

You'll notice that the templates have pairs of curly brackets/braces. Replace those placeholders with your own values to send a templated message.

For example, you could replace the `{{1}}` and `{{2}}` placeholders in the first template above to send: "Your hacker code is 1337."

## Completing the Challenge

You've learned about sessions. You've learned about windows. Now, take the quick quiz to the right to earn your loot and points.
