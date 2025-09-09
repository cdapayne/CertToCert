const https = require('https');
const fs = require('fs');
const path = require('path');

const cert = fs.readFileSync(path.join(__dirname, 'certs/client-cert.pem'));
const key = fs.readFileSync(path.join(__dirname, 'certs/client-key.pem'));
const ca = fs.readFileSync(path.join(__dirname, 'certs/ca-cert.pem'));

function recordEvent(application, event) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ application, event });
    const options = {
      hostname: 'localhost',
      port: 8443,
      path: '/api/events',
      method: 'POST',
      key,
      cert,
      ca,
      rejectUnauthorized: true,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, res => {
      res.on('data', () => {});
      res.on('end', () => resolve(res.statusCode));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

module.exports = { recordEvent };

if (require.main === module) {
  // Example usage
  recordEvent('local-app', 'button_press')
    .then(status => console.log('Event sent with status', status))
    .catch(err => console.error('Error sending event', err));
}
