# Freedom of speech

Not only can you gather DTMF tones from your caller, you can also accept speech. The [`<Gather>` TwiML verb](https://www.twilio.com/docs/voice/twiml/gather) defines a parameter named [`input`](https://www.twilio.com/docs/voice/twiml/gather#input) which you can set to `"speech"`. To help the speech request be better understood, you can (and should) provide comma separated [`"hints"`](https://www.twilio.com/docs/voice/twiml/gather#hints) as an attribute.

A common flow for this is to have your application `<Say>` what options are available, and then ask your caller to speak them. The gathered information is then posted in the `SpeechResult` field on the request from Twilio.

To crack open this chest, you must write a Programmable Voice application that accepts speech. We'll imagine that you are writing an IVR for a bank. When the user calls in they can either, ask the hours of operation, reset their pin, or finally they can ask to talk to an agent.

Wire up your incoming number to `<Gather>` `"speech"` information from the prompt:
**What would you like to do? You can say things like: hours, reset, or agent.**

Provide matching hints and handle the responses to the following `SpeechResult` requests:

_reset_: `<Say>` "Your pin has been reset"
_hours_: `<Say>` "Our hours are 9 to 5"
_agent_: `<Say>` "Connecting you to our next available agent"

_NOTE - If you run into trouble:_ Remember you can always output the Twilio Request values `SpeechResult` and `Confidence` to help debug your interactions.
