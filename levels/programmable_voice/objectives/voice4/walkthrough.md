# Come out and Play

You can deliver audio to your callers by using the [`<Play>` TwiML verb](https://www.twilio.com/docs/voice/twiml/play). This can provide a high-quality experience for your caller, as nothing sounds more human than a human. This `<Play>` verb is also frequently used to play music for callers.

## Create and host custom audio files

**Note:** If you don't want to create custom audio, you can use an existing, public audio file instead. If you'd like to use our default audio file or an audio file publicly accessible on the internet, skip ahead to the "Wire it up" section below.

`<Play>` accepts various formats of audio files: `mp3`, `wav`, `aiff`, `gsm`, and `μ-law`. While outside the scope of this objective, you should be able to locate resources online for creating an audio file in any of the supported formats.

If you'd like to create a custom audio file, you'll to need to host it on the Internet so that Twilio can access it.

Hosting a file is relatively straight forward if you have a web server. You place it in a publicly accessible directory, and you'll then be able to access the file via URL.

But what if you don't have a web server? Suppose you are using a TwiML Bin, which is hosted by us. This is where **Assets** come into _play_ (see what I did there 😉).

### Create an audio asset with Runtime

In your console, navigate to [**Runtime**](https://www.twilio.com/console/runtime/overview) > [**Assets**](https://www.twilio.com/console/runtime/assets/public).

Drag and drop the audio file you'd like to use anywhere on the page to upload it. You'll see that Assets create a new URL for you. This is the value you'll want to pass to `<Play>` call. Copy that to your clipboard, and let's go wire things up.

## Wire it up

Modify the TwiML returned by your [incoming call](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) to use the new `<Play>` keyword. If you haven't uploaded an audio file of your own, we have a classic demo mp3 that you can use.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>http://demo.twilio.com/docs/classic.mp3</Play>
</Response>
```

Go ahead and give your phone number (<%= env.TQ_TWILIO_NUMBER.value %>) a call. Verify that your audio file plays. Now you've got things rolling!

Now you should press the **HACK** button, so we can crack open this chest and continue your journey!
