# The Gather Loop

Completing this challenge should (ideally) not be super difficult if you're using the **code editor** - if you open the editor and press <em><i class="fa fa-play"></i></em>, you will have a Node.js server running that contains code that uses the `<Gather>` verb.

With that server running, you should be able to use [ngrok](https://ngrok.com/) to give this local app a temporary public URL. Once you have done that, you can update your phone number's configuration in the Twilio console to use that ngrok URL for a voice webhook.

If all of the above worked, when you click the *HACK* button, TwilioQuest should be able to validate that your Gather loop is operating as expected.

## Re-creating the magic

If you are attempting to re-create this code in Functions or your own code, take note of a couple things:

* By default, [Gather](https://www.twilio.com/docs/voice/twiml/gather) uses **the same URL as the current TwiML URL** for the `action` URL which receives a `Digits` POST parameter after the `<Gather>` is completed. In this way, you can have the same route in your application become a "Gather loop".
* When the `action` URL is requested, it will receive `Digits` as a `POST` parameter. 

To pass validation for this challenge, your `action` URL's response must contain a `<Say>` tag with the exact string of `Digits` entered during the previous `<Gather>`.