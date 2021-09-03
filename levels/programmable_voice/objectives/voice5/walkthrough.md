# Function junction

A Twilio Function is code that is stored on our servers and executed based on a specific event. To cross this barrier, you will respond to an incoming voice call with your function. Keep reading to learn how to create a new **Function** that responds differently based on the **prefix** of the incoming call's phone number.

## Prefixes

A prefix is the beginning of a series of characters. Phone numbers typically define their location by using specific prefixes. The first part of the number is the country code, usually followed by another code that further narrows its geographical location.

The goal of this challenge is for you to determine if an incoming voice call is coming from a number in a defined geographical location of your choosing.

<details>
  <summary>Specific prefix examples</summary>

  The numbers from the United States of America start with the country code `+1`. There is also an area code, which is used to group numbers in a specific area. Numbers based in the city of Portland, Oregon have an area code of `503`. So the prefix for the number `(503) 555-1212` would be `+1503`.

Let's take a look at a number in Berlin, Germany. The country code for Germany is `+49`. [Telephone numbers in Germany](https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany) also support geographic regions. The area code for Berlin is `030`. You could then define a Berlin prefix as `+49030`.

</details>

## Create a Function

To get started, go to [**Functions**](https://www.twilio.com/console/runtime/functions/manage) in the Twilio console. Click the `+` button to create a new function, and from the list of templates choose **+ Blank** and then click **Create**.

The **Function Name** field makes it easier to find our function and use it later. Name your new function `Prefix Checker`.

Functions will give you a randomly generated subdomain name – this is that  non-editable portion of the **Path** field. In the editable text field following that URL, enter the pathname `/prefix-checker`.

In the **Code** field, you'll notice some boilerplate JavaScript.

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  // twiml.say("Hello World");
  callback(null, twiml);
};
```

If that code looks like a foreign language to you, don't fear. We've included a little JavaScript refresher for you below. If you're comfortable with the basics of JavaScript, please feel free to skip right past it.

<details>
    <summary><strong>JavaScript refresher</strong></summary>

JavaScript is a prototype-based language. It supports Functional Programming (FP) concepts as well as a smattering of Object-Oriented Programming (OOP) capabilities. This combination of concepts has been known to confuse developers that usually code in one or the other paradigm.

The first line of that code is a pretty great example of the conceptual collision:

```javascript
exports.handler = function(context, event, callback) {
```

On this line, `exports` is an **object**. The **property** `handler` is assigned to a newly created anonymous `function`. Three **parameters** are defined by that anonymous function's `context`, `event`, and `callback`.

An important thing to note here is that `exports` is a special object that assists in exposing functions for the module to use. By exporting the `handler` function, we define the function that should be called to handle a special event. When that defined event occurs, Twilio will call this function, passing in the 3 arguments that match the parameters mentioned above.

We'll explore those parameters here in a bit, but first, let's do a little review of variables.

<details>
    <summary>Variables refresher</summary>

We give things names so that we can refer to them later. Variables are a name in our code that refers to a value that was previously created. We create variables so we can refer to the value later by name.

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

This line creates a new variable named `twiml`. The [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) statement defines a new named variable available to our anonymous function body.

</details>

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

This line creates a new variable named `twiml` and stores an **instance** of a `Twilio.twiml.VoiceResponse`. The `Twilio` module is included for your use in every Function. We'll take a look at how to use a `VoiceResponse` object for our needs here shortly.

```javascript
// twiml.say("Hello World");
```

The leading double forward slashes on this line, `//`, provide an example of how you can provide **comments** for readers of your code. Due to this line being commented out, the code will not run. The code has been intentionally left here for you to see how you might interact with the `VoiceResponse` object.

This line, if uncommented, would call the **method** `say` on the `twiml` instance and then pass in the **string** `"Hello World"`. You might notice that this method must change the `twiml` instance directly, as we don't capture any return value.

We'll discuss this more shortly. Before that, let's do a quick refresher on strings.

<details>
    <summary>String refresher</summary>

Strings represent a series of characters all strung together, like a banner at a birthday party. In JavaScript, you can create strings by surrounding them with quotes:

```javascript
let lyrics = 'Never gonna give you up';
let singer = 'Rick Astley';
```

You can use either single `'` or  double `"` quotes to create a string. Strings are objects and therefore have [many methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) available to them.

```javascript
lyrics.toUppercase(); // returns "NEVER GONNA GIVE YOU UP"
```

</details>
</details>

### Handler arguments

The `handler` function receives the following arguments:

#### `context`

This is an object that provides context for the current function. Since the function is connected to your account, it has access to your account credentials. Using the `context.getTwilioClient()` method will get you access to an authenticated client.

#### `event`

The `event` argument will contain information specific to the event that triggered the handler. In our case, `event` will represent the [`HTTP` request from an incoming voice call](https://www.twilio.com/docs/voice/twiml#request-parameters). You'll find that the HTTP POST key-value pairs have been applied as properties on this object. Therefore you can conveniently access properties you need like so: `event.From`

#### `callback`

This `callback` is a **function** that is passed in. It expects two parameters: an error if applicable, and the response:

```javascript
callback('Oh no something bad happened!');
```

Or on success

```javascript
callback(null, twiml);
```

Read the docs for more information on [function invocation](https://www.twilio.com/docs/runtime/functions/invocation)

## VoiceResponse

As the default boilerplate code shows

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

The `Twilio` module provides a handy tool for generating `twiml` responses. `VoiceResponse` supports all available [TwiML verbs for Programmable Voice](https://www.twilio.com/docs/voice/twiml).

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World');
  callback(null, twiml);
};
```

<details>
    <summary>Generated TwiML</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello World</Say>
</Response>
```

</details>

For this objective, we want to say something if the caller's phone number matches a specific prefix.

## Put it all together

One handy way to check for a matching prefix is to use the JavaScript string method `startsWith`. This method returns a boolean (true or false) value.

```javascript
'watermelon'.startsWith('water'); // returns true
```

We can use `startswith` to check the incoming caller's prefix. For example, this code will check for the Portland, OR prefix of `+1503`, and reply with the familiar trope.

```javascript
if (event.From.startsWith('+1503')) {
  twiml.say('Keep Portland Weird!');
}
```

<details>
    <summary>The full Function</summary>

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World');
  if (event.From.startsWith('+1503')) {
    twiml.say('Keep Portland Weird!');
  }
  callback(null, twiml);
};
```

This code will generate the following TwiML response **if** the incoming phone number has the prefix `+1503`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello World</Say>
    <Say>Keep Portland Weird</Say>
</Response>
```
</details>

You can make this code specific to whatever prefix you are checking. Our  objective is to make the response different based on a specific location.

## Verifying it works

**Save** your function, and you will see it gets deployed to our servers.

Go to your [incoming number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) and under the **Call comes in** section choose **Function** and then choose your function **Prefix Checker**.

Make an incoming call with a number that matches your expected prefix. You should hear your message. Now make a call that doesn't match your prefix.

Now let us verify it. Enter the **prefix** that we should check and then press the **HACK** button.

Let's crack open this barrier!
