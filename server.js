const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const events = [];

app.post('/api/events', (req, res) => {
  const { application, event } = req.body;
  if (!application || !event) {
    return res.status(400).send('Missing application or event');
  }
  events.push({ application, event, timestamp: new Date().toISOString() });
  res.status(204).end();
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.use(express.static(path.join(__dirname, 'public')));

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs/server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/server-cert.pem')),
  ca: fs.readFileSync(path.join(__dirname, 'certs/ca-cert.pem')),
  requestCert: true,
  rejectUnauthorized: true
};

https.createServer(options, app).listen(8443, () => {
  console.log('Analytics server listening on https://localhost:8443');
});
