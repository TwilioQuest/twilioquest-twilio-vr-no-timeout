# Using Functions when TwiML Bins just won't do

Let's take a look at Twilio Runtime Functions: hosted Node.js code that you can use to respond to incoming SMS messages.

TwiML Bins provide a great solution for static or lightly templated responses, but sometimes, you need to do more. You might need to call an external API or write code that generates a random response. And just like TwiML Bins, Functions are hosted, so you don't have to worry about spinning up a server to host your code. In other words, when you need to write a bit of code for a response, a Twilio Runtime Function is a great hosted option.

To pass through this barrier, you'll use Twilio Functions to create an 8 Ball that returns a magical answer to incoming SMS questions.

## Starting with just one answer

To learn how Twilio Functions work, we're going to start with a static response, much like a TwiML Bin, and then build from there.

When you create a Twilio Function, you write [Node.js](https://en.wikipedia.org/wiki/Node.js) code that can respond to webhook events (in this case, an incoming SMS), just like we've seen using TwiML bins

Navigate to the "Functions" section of the Twilio Console and hit the + (plus) button to create a new function:

<center>
  <img src="images/programmable_sms/create_function.png" />
</center>

In the pop-up menu, select the **Hello SMS** template to use a Function template that already has some helpful TwiML functionality imported.

Give your new function a friendly name, perhaps something like "8 Ball" and add a unique path url:

<center>
  <img src="images/programmable_sms/8ball-function.png" />
</center>

In the Configuration section, you will see a little bit of Node.js code pre-populated in the editor already. We selected the "Hello SMS" template, so the Node.js code is set up to return a "Hello World" message to an incoming SMS message. We're going to be writing the code from scratch for this walkthrough, so delete the inner three lines of the function, leaving only the outer shell:

```
exports.handler = function(context, event, callback) {
...
};
```

Replace the lines you just deleted with this code that 1) creates a `twiml` variable and defines it with a string that contains the TwiML tags that you are already familiar with. Fill in your favorite response to a yes-no question in between the `<Message>...</Message>` verb tags:

```js
let twiml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Message>Don't hold your breath.</Message>
  </Response>
`;
```

Finally, we need to tell our function to return this string as TwiML by creating a Twilio response and setting the `twiml` we created as the Body with the `setBody` method:

```js
let response = new Twilio.Response();
response.setBody(twiml);
```

Then we need to make sure that our response is sent as `xml`, so we add the appropriate content type header:

```js
response.appendHeader('content-type', 'text/xml');
```

At the bottom, just before the closing curly brace of the `handler` method, make sure to call the callback function, passing in `null` as the first argument and `response` as the second:

```js
callback(null, response);
```

## Set up your phone number and test

Back in the Phone Numbers section of the console, select the Twilio Phone Number you want to configure. Under **A MESSAGE COMES IN**:

1. Select **Function** from the first drop-down menu
2. Select the "8 Ball" function that we created

<center>
  <img src="images/programmable_sms/message_comes_in_function.png" />
</center>

Is this flow starting to feel familiar yet?

Send a text to your Twilio number to confirm that you got back...the only possible response.

Up until this point, we've done the same thing we could do with a TwiML bin. The real magic of functions is the ability to create more dynamic responses. Let's learn that next!

## Now, with actual answers!

Have you played with a [Magic 8 Ball](https://en.wikipedia.org/wiki/Magic_8-Ball) before? You ask the 8 Ball a yes-no question while shaking it, and magically, a response appears in its tiny view window. We're going to implement the same thing, but with some JavaScript that can run in your Twilio Function.

First, delete the guts of your handler method. You should be back to an empty shell:

```javascript
exports.handler = function(context, event, callback) {
  // ...
};
```

We need to come up with a list of possible responses from which to choose. We can put some of the standard Magic 8 Ball in a JavaScript array, but you can easily substitute or add in your own.

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.'
];
```

Next, out of these many answers, we want to select one at random to return to the person who sent in a question. To do this, we can use `Math.random` method to select a number between 0 and the length of the `answers` array: `Math.random() * answers.length`

However, JavaScript's `Math.random` method returns a [floating point](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Floating-point_numbers) number, and we want a round integer. We can use `Math.floor` to get the largest integer less than or equal to the random number we generated: `Math.floor(Math.random() * answers.length)`.

Finally, we want to use the random number we generated to access an answer inside the `answers` array and store it in the `yourAnswer` variable. All together, the guts of your function should look like this now:

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.',
];
let yourAnswer = answers[Math.floor(Math.random() * answers.length)];
```

## Introducing the Twilio Node.js Client

In our first example, we returned raw TwiML, in all its angle bracketed glory, but it was a little cumbersome to type out. Because Twilio Functions are written in Node.js, we can use Twilios [Node.js Client](https://www.twilio.com/docs/libraries/node) to create our TwiML instructions. The Twilio client is already available for use in your Function, so no need to import/require it.

Take a look at the following code:

```javascript
let response = new Twilio.twiml.MessagingResponse();
response.message(yourAnswer);
```

Instead of using the `<Response>` and `<Message`> tags, the Twilio client abstracts most of this away from us, with methods that we can call to create the TwiML for us. To create a new `<Response>`, we can call `MessagingResponse` method, and we can use the `message` method instead of writing the `<Message>...</Message>` tags by hand.

Don't forget to callback at the end of the Function, before the closing curly brace `}`: `callback(null, response);`

## Seek the answer(s) to your question!

Because you already set up your Twilio Phone Number to call your 8 Ball function, you should be able to send in your question and get back a reply. This time, however, it should be something new and exciting!

(Not happy with the answer to your question? Keep texting until you get the reply you want!)

There is a lot more that you can do with Functions, but let's continue our SMS Mission for now. Enter your Phone Number on the right, hit _HACK_, and let's be on our way!
