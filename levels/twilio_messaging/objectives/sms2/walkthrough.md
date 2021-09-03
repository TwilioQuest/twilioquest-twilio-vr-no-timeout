# Sending Outbound MMS Messages

Note: This objective is for U.S. and Canadian phone numbers only.

You can use Twilio's [RESTful API](https://www.twilio.com/docs/sms/api) to send an outbound MMS, just like you did when you send your first SMS message. To open this chest, you'll follow the same steps to send an SMS message with one very important addition: _the URL of the media you want to send_.

## What do I need to send an MMS message?

Just like when you sent an SMS message, you'll authenticate the request that you send to Twilio's API. When you make the request, you'll pass in three parameters:

- **MediaUrl (and/or Body):** Twilio needs some content to send in your message: a MediaUrl, a Body, or both! You need to tell Twilio's API where to find the image that you want to send in your MMS by passing in a [MediaUrl (image)](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource).
- **To:** The phone number you want to send the message to. If you are using a trial account, this must be one of your [verified phone numbers](https://www.twilio.com/console/phone-numbers/verified).
- **From:** The Twilio programmable phone number the message will be sent from. You can use a phone number you configured previously (check the **Settings** UI), or [any SMS-capable phone number you own](https://www.twilio.com/console/phone-numbers/incoming).

## Making the API Request

How you send the request to Twilio's API is up to you. You can use one of Twilio's [helper libraries](https://www.twilio.com/docs/libraries) or the following [cURL](https://curl.haxx.se/docs/manual.html) command, replacing your own credentials and media URL:

```
curl -X POST'https://api.twilio.com/2010-04-01/Accounts/AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json' \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15017122661" \
--data-urlencode 'MediaUrl=https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg' \
-u AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[AuthToken]
```

Here's what it would look like using the [Python helper library](https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-python):

```python
from twilio.rest import Client

# your account sid and auth token from twilio.com/console
account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    media_url="https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg",
    body="Why isn't that an API?",
    from_="+15017122661",
    to="+15558675310"
)

print(message.sid)
```

If you use the QuestIDE, an editable [Node.js](https://nodejs.org/) code sample will be loaded up for you. However, the parameters won't be pre-loaded for you, so you'll need to fill those out yourself this time.

## Opening the Chest

When you make the API request, you'll get back a message SID for your MMS. You can tell that it is an MMS because it will start with _MM_. Copy the SID for your MMS and enter it into the hacking interface. Once you hit `HACK`, TwilioQuest will check your Twilio account and verify that the message you sid contains a MediaUrl.
