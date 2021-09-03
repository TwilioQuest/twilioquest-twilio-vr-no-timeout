# Sending a WhatsApp message

You've set up your Sandbox and used it to send your first WhatsApp message. But you're a developer, and you want to write some code. This objective is all about sending an outbound message to initiate a conversation through WhatsApp with your own code.

To pass this barrier, you'll need to send an outbound WhatsApp message through Twilio's API and retrieve the unique message identifier (the "message SID") as well.

## What information do I need to send a WhatsApp message?

When making an API request to Twilio, in addition to passing along our authentication credentials, we need to provide at least three parameters:

- **To:** The destination WhatsApp number, with the format: **whatsapp:<E.164 Formatted number>**. This should be the number that you used to join the [WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox), not your Twilio phone number.
- **From:** The `From` number, prepended with **whatsapp:**. Note: Until you go through the approval process to send WhatsApp messages from your Twilio number, you will use your [WhatsApp Sandbox Number](https://support.twilio.com/hc/en-us/articles/360007721954-Getting-Started-with-Twilio-for-WhatsApp-Beta-#senderID).
- **Body:** The actual text of the message we want to send. Because this is an outbound message, this will be a pre-approved template with the format: "Your appointment is coming up on {{1}} at {{2}}."

## Making the API request

To send an outbound WhatsApp message, you will make an HTTP POST request to the [Message resource](https://twilio.com/docs/sms/api/message-resource) endpoint.

You can make your API request from whichever programming environment or tool that supports making HTTP requests. You can download and install [the Twilio helper library of your choice for many common programming languages](https://www.twilio.com/docs/libraries). You can also use the QuestIDE by clicking on the "</> Show Code Editor" button to the right.

The following [cURL](https://curl.haxx.se/docs/manual.html) command would (when configured with the necessary parameters instead of placeholders) send a message from your account.

```
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json \
--data-urlencode "From=whatsapp:+14155238886" \
--data-urlencode "Body=Your appointment is coming up on <date> at <time>" \
--data-urlencode "To=whatsapp:+15017122661" \
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
```

The Twilio documentation contains [code samples for many programming languages](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource), showing how you would send WhatsApp messages using the Twilio helper library for that environment. Here is [an example using our Python helper library](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-create-a-message&code-language=Python&code-sdk-version=6.x):

```python
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='whatsapp:+14155238886',
    body='body',
    to='whatsapp:+15017122661'
)

print(message.sid)
```

If you use the QuestIDE, an editable [Node.js](https://nodejs.org/) code sample will be loaded up for you, pre-populated with most of the necessary parameters from your TwilioQuest configuration.

## Get those points!

When you make the API request, the message's SID will be one of the pieces of data returned by the request. Copy that value and paste it into the HACK interface on the right. Click the `HACK` button, and TwilioQuest will make sure that a **WhatsApp** message matching that SID exists on your account. If so, you've cleared the barrier!
