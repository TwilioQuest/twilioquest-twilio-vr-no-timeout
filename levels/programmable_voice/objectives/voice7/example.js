const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

// This is the URL that will be requested when your number receives a call
// It will be requested without a "Digits" parameter intitially, but subsequent
// requests will contain "Digits"
app.post('/voice', (request, response) => {
  const { Digits, From } = request.body;
  
  console.log('Incoming call from ', From);
  let twiml = '';

  // This is the first time the URL has been requested, so no Digits
  if (!Digits) {
    twiml = `
      <Response>
        <Gather>
          <Say>
            Press any series of numbers on your keypad. Go nuts. You can end
            your D T M F rampage by pressing the hash key.
          </Say>
        </Gather>
      </Response>
    `;
  } else {
    // If Digits has been populated, repeat them back
    twiml = `
      <Response>
        <Say>You entered: ${Digits}</Say>
        <Say>Goodbye!</Say>
      </Response>
    `;
  }

  // Finally, return the TwiML
  response.type('text/xml');
  response.send(twiml);
});

// Use a tunneling tool like ngrok to expose this server to the public Internet!
// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Express server listening on localhost:${PORT}`)
);
