const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

// This is your voice URL - a clean slate. It won't work out of the box this
// time, however. You know what to do, Operator.
app.post('/voice', (request, response) => {
  let twiml = '';
  
  // Insert magic here

  response.type('text/xml');
  response.send(twiml);
});

// Use a tunneling tool like ngrok to expose this server to the Internet!
// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Express server listening on localhost:${PORT}`)
);
