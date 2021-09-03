# Setting up status callbacks for messages

When you send a message with Twilio--either as an outbound SMS or a reply to an incoming SMS--you can also specify an `action` attribute on the TwiML `<Message>` verb that points to a webhook URL. When your message status changes, from "Sent" to "Delivered," for example, Twilio will make a request to the status webhook URL that you set. The code running at that URL can take a variety of actions based on the request that Twilio sends whenever the message status changes.

## What are the message statuses?

Some of the message statuses you may encounter are:

- **Sent**: The nearest upstream carrier accepted the message.
- **Delivered**: Twilio has received confirmation of message delivery from the upstream carrier, and, where available, the destination handset.
- **Failed**: The message could not be sent for one of [variety of reasons](https://www.twilio.com/docs/sms/api/message-resource#delivery-related-errors).

You can see the other statuses on [the API Reference page](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).

## Setting up your status callback URL

We've seen how to set up a route in a web application to reply to an inbound SMS message at your Twilio phone number. Now, we need to set up a second route; this one will handle incoming requests from Twilio when there is an update on the status of your reply message.

The code that runs in the corresponding function can do whatever you like. To pass this barrier, you will need to enter the `MessageSid` and the last status that you receive. Where can you find those? On the `request` that Twilio sends your application!

Recall that Twilio sends your status callback URL a request every time that it has a update on the delivery status of your message. The request will contain Twilio's standard request parameters as well as [some extra status-related parameters](https://www.twilio.com/docs/sms/api/message-resource#statuscallback-request-parameters). You can access them by looking at the `request.body`. In Node.js, that looks like `request.body.MessageStatus` and `request.body.MessageSid`.

If I wanted to print that out, it might look something like this in Node.js and Express:

```
app.post('/status', (request) => {
  console.log(`Message SID ${request.body.MessageSid} has a status of ${request.body.MessageStatus}`);
});
```

And in a Python Flask app, it would look like this:

```
...
@app.route("/status", methods=["GET", "POST"])
def my_status_function():
    print(f"Message SID {request.values.get('MessageSid')} has a status of {request.values.get('MessageStatus')}")
```

## Using the TwiML `action` attribute

When you create a message with TwiML, you can use the `action` attribute to specify a webhook URL. An attribute sits inside the `<...>` tags of the Message verb and gives more information to Twilio about how to send the message on your behalf. Twilio will make a request to that URL as your message travels towards its destination.

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message action="https://your_url_here.com/status">Hello, World!</Message>
</Response>
```

_Note_: You don't have to set the `action` attribute to the full URL if your application also contains the `status_callback` route. Your `<Message>` verb could look like this:
`<Message action="/status">Hello, World!</Message>`

Your status callback URL should point to some code that cares about those status updates. (Hint: For this example, that should be the route that you set up for status updates!)

## Completing the challenge

In the QuestIDE, your own code, or a TwiML bin, respond to an incoming message. This time, make sure to include the `action` attribute on the `<Message>` verb that you use to reply.

If you use the QuestIDE, the bare skeleton of the [Express.js](https://expressjs.com/) web application has been set up. You will need to fill in:

1. The new route for the status callback URL (Hint: Maybe something like `/status`)
2. The messaging TwiML to respond to the incoming SMS with the `action` attribute
3. The body of the function that will be called when Twilio sends a request to your `status_callback` URL and print out the `MessageSid` and `MessageStatus`

Once you hit `RUN`, your web application will start up. When you text your Twilio phone number, you should see Twilio's request to your application in the console. And once your application sends back the reply, your code handling the request should print out each status update that your webhook receives from Twilio! Copy the message SID and remember the last status update that you receive so that you can enter it into the `HACK` interface.
