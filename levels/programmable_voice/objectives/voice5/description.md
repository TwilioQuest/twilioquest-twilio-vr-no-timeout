# Function Junction

[Create](https://www.twilio.com/console/runtime/functions/manage) a [Twilio Function](https://www.twilio.com/docs/runtime/functions) to respond to an incoming call. Your function should contain logic that ultimately returns a Voice TwiML response. However, the response should be different **if the phone number of the caller contains a special prefix:** that you specify (and tell us about in the hack UI on the right). 

For example, if the caller is calling from a number starting with `+1503`, you might respond with: `<Say>Keep Portland weird!</Say>`. If the caller's phone number does not begin with that prefix, you would `<Say>` something else.

When [your phone number](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)'s voice URL is connected to a Function which behaves in this way, click the *HACK* button. We'll make sure you put the "fun" in Function.
