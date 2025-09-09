const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const events = [];

// --- Secure API (certificate required) ---
const secureApp = express();
secureApp.use(express.json());

secureApp.post('/api/events', (req, res) => {
  const { application, event } = req.body;
  if (!application || !event) {
    return res.status(400).send('Missing application or event');
  }
  events.push({ application, event, timestamp: new Date().toISOString() });
  res.status(204).end();
});

secureApp.get('/api/events', (req, res) => {
  res.json(events);
});

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs/server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/server-cert.pem')),
  ca: fs.readFileSync(path.join(__dirname, 'certs/ca-cert.pem')),
  requestCert: true,
  rejectUnauthorized: true
};

https.createServer(options, secureApp).listen(8443, () => {
  console.log('Analytics API listening on https://localhost:8443');
});

// --- Public dashboard (no certificate required) ---
const publicApp = express();
publicApp.get('/api/events', (req, res) => {
  res.json(events);
});
publicApp.use(express.static(path.join(__dirname, 'public')));

publicApp.listen(8080, () => {
  console.log('Dashboard available at http://localhost:8080');
});
