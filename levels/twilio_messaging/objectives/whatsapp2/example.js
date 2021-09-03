const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

// Create a route to handle incoming WhatsApp messages
app.post('/whatsapp', (request, response) => {
  console.log(
    `Incoming WhatsApp message from ${request.body.From}: ${request.body.Body}`
  );
  response.type('text/xml');
  response.send(`
    <Response><Message>Replace this text with the right string</Message></Response>
  `);
});

// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Express server listening on localhost:${PORT}`)
);
