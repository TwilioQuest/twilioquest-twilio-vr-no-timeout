# Sending Outbound WhatsApp media messages

Sometimes a text-only message just won't cut it. If you want to send a media file with WhatsApp, you can use Twilio's REST API to send a media message through WhatsApp. To open this chest, you'll follow the same steps to send an outbound WhatsApp message with one important addition: the **URL of the image file that you want to send**.

## Are you in the right window of time?

Remember that WhatsApp messages have a session constraint. You can send media messages to any WhatsApp user who has _sent you a message within the last 24 hours._ Outside of this window, you must use a pre-approved template, and those do not include media.

If you're working through this WhatsApp TwilioQuest mission within the same 24-hour period, you have already initiated a session with your WhatsApp-enabled [Sandbox] number. However, if you're outside of a Session, start a new one by sending a WhatsApp message from your own device to your WhatsApp-enabled [Sandbox] number.

## What information do I need to send a media message?

When you send a WhatsApp media message, you'll create your request to Twilio's API with three parameters:

- **To:** The destination WhatsApp number, with the format: **whatsapp:<E.164 Formatted number>**. This should be the number that you used to join the [WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox), not your Twilio phone number.
- **From:** The `From` number, prepended with \*\*whatsapp:\*\*. Note: Until you go through the approval process to send WhatsApp messages from your Twilio number, you will use your [WhatsApp Sandbox Number](https://support.twilio.com/hc/en-us/articles/360007721954-Getting-Started-with-Twilio-for-WhatsApp-Beta-#senderID).
- **MediaUrl (and/or Body)**: This will be the content of your message: the URL of the media file, a text body, or both. You will tell Twilio's API where to find the media file that you want to send by passing in a [MediaUrl (image)](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource).

## What types of media files can I send?

The Twilio API for sending WhatsApp media messages supports the following formats:

- Images: JPG, JPEG, and PNG
- Audio: MP3, OGG, AMR
- Documents: PDF

This is an important distinction between WhatsApp media messages and MMS.

## Making the API Request

How you send the request to Twilio's API is up to you. You can use one of Twilio's [helper libraries](https://www.twilio.com/docs/libraries) or the following [cURL](https://curl.haxx.se/docs/manual.html) command, replacing your own credentials and media URL:

**Note: The `From` and `To` numbers must include the `whatsapp:` prefix.**

```
curl -X POST'https://api.twilio.com/2010-04-01/Accounts/AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json' \
--data-urlencode "From=whatsapp:+14155238886" \
--data-urlencode "To=whatsapp:+15017122661" \
--data-urlencode "MediaUrl=https://demo.twilio.com/owl.png" \
--data-urlencode "Body=Here's an owl for your troubles:" \
-u AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[AuthToken]
```

Here's what the same outbound WhatsApp media message request would look like with the Python server-side SDK:

```python
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
account_sid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
auth_token = "your_auth_token"
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="whatsapp:+14155238886", # Your Sandbox number
    to="whatsapp:+15017122661", # Your own WhatsApp-enabled number
    body="Here's an owl for your troubles:",
    media_url="https://demo.twilio.com/owl.png",
)

print(message.sid)
```

## Completing the Challenge

When you make the API request, you'll get back a message SID for your WhatsApp media message. Like an MMS, your message SID will begin with "MM." Make sure to copy this SID and enter it in the "Hack" interface at the right. Once you hit the "HACK" button, TwilioQuest will retrieve your WhatsApp message and check it for a valid media file. Then the points and loot will be yours!
