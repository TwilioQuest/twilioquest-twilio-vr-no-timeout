# What's App, Doc?

You can receive incoming messages from WhatsApp users in your code by creating a [webhook](https://www.twilio.com/docs/glossary/what-is-a-webhook) to receive inbound message events from Twilio.

Using your own web application or the simple web app created for you in the **code editor**, set up a public URL that returns [Messaging TwiML](https://www.twilio.com/docs/sms/twiml) in response to an HTTP `POST` request. Configure this URL in [the WhatsApp sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox) where it says "WHEN A MESSAGE COMES IN".

The TwiML in your response must send a reply message with the text `What's app, doc?` in order to complete this challenge. When you have sent a reply message containing this text, click *HACK* and we'll chek for ourselves!
