const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

app.post('/sms', (request, response) => {
  console.log(
    `Incoming message from ${request.body.From}: ${request.body.Body}`
  );
  response.type('text/xml');
  // TODO: Update the TwiML below to use <Redirect> instead - this web app
  // has a /redirect route below you can use. No need to include the "http"
  // in the URL - Twilio can handle relative URLs like "/redirect"
  response.send(`
    <Response>
      <Message>
        Uh oh - I forgot to set up my Redirect TwiML.
      </Message>
    </Response>
  `);
});

// Here's a route you can redirect to...
app.post('/redirect', (request, response) => {
  console.log('Redirect request received! Responding...');
  response.type('text/xml');
  response.send(`
    <Response>
      <Message>Hi there! I am TwiML from a Redirect.</Message>
    </Response>
  `);
});

// Use a tunneling tool like ngrok to give your web app a public URL!
// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Express server listening on localhost:${PORT}`)
);
