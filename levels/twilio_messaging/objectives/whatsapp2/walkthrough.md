# Yeah, you're free! Free-forming!

You've sent a templated outbound WhatsApp message, but it's now time to handle an incoming WhatsApp message. This will enable you to have a conversation with your users on WhatsApp, and will begin a **24-hour period** where you can send messages back to your users **without using pre-formatted templates**.

When a user initiates a message with your WhatsApp-enabled number (in this case, your Sandbox number), it kicks off a limited window or "WhatsApp Session." Sessions are valid for 24 hours after the most recently received message from the sender, and during this time, you can send them free-form messages. That's right, for 24 hours, you are free from the constraints of templated messaging!

## Serve-rs you right!

You'll be setting up a small server using your own code or the QuestIDE. You will tell Twilio to make a request to this server when it receives an incoming WhatsApp message to your WhatsApp-enabled number (in this case, your Sandbox number).

Your server should do two things:

1. Handle incoming requests to the "/whatsapp" route
2. Return TwiML instructions for your WhatsApp response

### Handling the Response

**Note:** If you use the QuestIDE, you will be provided with the skeleton of a web application that responds with TwiML in Node.js.

**Make sure that you return a TwiML response that includes the string "What's app, doc?"**

However, if you'd prefer to use a different programming language and web framework, you can still complete this challenge. You'll just be writing your code outside of the QuestIDE.

Twilio has language-specific tutorials on how to set up a server that returns response TwiML that you can follow. The mechanics are the same for SMS and WhatsApp. Remember that the main difference is that you'll be interacting with numbers that have the `whatsapp:` prefix for this mission.

- [C# / .NET](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-csharp)
- [Java](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-java)
- [Python](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python)
- [PHP](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-php)
- [Ruby](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-ruby)
- [Node.js (Using your own Node, not QuestIDE)](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)

Here's what a Python/Flask server would look like:

```
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

# Create a route to handle incoming WhatsApp messages
# This is where the magic happens!
@app.route("/whatsapp", methods=['GET', 'POST'])
def sms_ahoy_reply():
    print(f'Incoming message from {request.values.get("From")}: ${request.values.get("Body")}')

    # Here, we generate TwiML using the Python helper library
    resp = MessagingResponse()
    resp.message("Thanks for messaging! It's good to hear from you!")

    return str(resp)

if __name__ == "__main__":
    app.run(port=8767)
```

### A TwiML review

Just like with conversational SMS, your web application should return [TwiML instructions](https://www.twilio.com/docs/sms/twiml) to tell Twilio how to respond.

A raw TwiML response might look like this. Note that it must include the `<Response>...</Response>` and `<Message>...</Message>` verb tags.

```
<?xml version="1.0" encoding="UTF-8">
<Response>
  <Message><Body>Thanks for messaging! It's good to hear from you!</Body></Message>
</Response>
```

Your application can return raw TwiML like you see above. You can also use the [server-side helper libraries](https://www.twilio.com/docs/libraries) to generate the TwiML.

Don't forget to return the string "**What's app, doc?**" and, of course, run your server.

## Connecting Twilio and your server with ngrok

You've got a server running, and it returns TwiML, but it's only on your laptop, with no way for Twilio to access it. To expose your server to the greater world, you can use [ngrok](https://ngrok.com/). ngrok is a tool that provides your web application with a publically accessible URL.

(If you need a review of ngrok, check out this [Twilio blog post on how to use ngrok](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html).)

Once you have have you ngrok URL up and running, you can test it by going to the URL in your browser. Your ngrok URL will look like something like "https://1ab29445.ngrok.io/whatsapp". If all is set up correctly, you should see your message in the browser window.

Finally, you need to tell Twilio to make an HTTP request to your server (via ngrok) when it receives a WhatsApp message to your Sandbox number. Navigate to the [Twilio Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/sandbox), and enter your ngrok URL in the "When a message comes in" field.

<center>
  <img src="images/whatsapp/whatsapp_sandbox_webhook.png" />
</center>

## Completing the challenge

Server? Check! TwiML? Check! Webhook Set-up? Check! To pass this barrier, you should have the following components in your application:

1. Respond with **What's app, doc?**
2. Run your server
3. Have ngrok running locally
4. Configure the Twilio Sandbox with your ngrok URL

When you have sent your WhatsApp incoming message and received back a reply, hit the "HACK" button on the right to get your points. We'll check your recent WhatsApp messages for an outbound message with that specific string.
