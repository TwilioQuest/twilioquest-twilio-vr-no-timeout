# Formatting: You've got options with WhatsApp

So you want to send a message with WhatsApp that includes a formatted body? Great news, you can do so easily with Twilio's API with a handful of formatting symbols.

## The formatting symbols

| Formatting         | Symbol                                                       | Example                   |
| ------------------ | ------------------------------------------------------------ | ------------------------- |
| Bold               | Asterisk (\*)                                                | This is worth \*150\* XP. |
| Italics            | Underscore (\_)                                              | Welcome, \_Operator\_!    |
| Strikethrough      | Tilde (\~)                                                   | The \~Frog~ Fog Owl       |
| Code/Pre-formatted | Three backticks(\```) | \```console.log("Hello, World!");``` |

## Sending a formatted message body with the Twilio API

Add these formatting options in the `Body` of your WhatsApp message when you make your Twilio API call.

For example, here's what a [cURL](https://curl.haxx.se/docs/manual.html) example with ~strikethrough~ formatting looks like:

```
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json \
--data-urlencode "From=whatsapp:+14155238886" \
--data-urlencode "Body=~Pie~ Cake is the best dessert." \
--data-urlencode "To=whatsapp:+15017122661" \
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
```

If you use a [helper library](https://www.twilio.com/docs/libraries), you would use the same symbols when you programmatically created your TwiML. Here's a Python example:

```python
from twilio.rest import Client

## Your Account Sid and Auth Token from twilio.com/console
account_sid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='whatsapp:+14155238886',
    to='whatsapp:+15017122661'
    body='~Pie~ Cake is the best dessert.',
)

print(message.sid)
```

## Quick! Do you have a session open?

Remember that WhatsApp messages have a session constraint for sending free-form messages. When you're playing through TwilioQuest, it doesn't hurt to send an inbound message from your own device to your WhatsApp-enabled [Sandbox] number to keep the session alive.

## Opening the Chest

Using your own code or the QuestIDE, send an outbound WhatsApp message that includes at least one of the four formatting options (\*bold\*, \_italics\_, ~strikethrough~, and \`\`\`code/pre-formatting\`\`\`.) When you get the SID of your WhatsApp message, enter it into the Hack interface to get your points and loot.
