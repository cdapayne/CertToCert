# API Examples and Output

This document shows actual API requests and responses for CertToCert.

## Table of Contents
- [Sending Events](#sending-events)
- [Retrieving Events](#retrieving-events)
- [API Response Examples](#api-response-examples)
- [Error Responses](#error-responses)
- [Integration Examples](#integration-examples)

---

## Sending Events

### Example 1: Single Event via Node.js Client

```bash
$ npm run client
```

**Output:**
```
> certtocert@1.0.0 client
> node client.js

Event sent with status 204
```

### Example 2: Custom Event via Node.js

```javascript
const { recordEvent } = require('./client.js');

recordEvent('web-app', 'user_login')
  .then(status => console.log('Event recorded:', status))
  .catch(err => console.error('Error:', err));
```

**Output:**
```
Event recorded: 204
```

### Example 3: Multiple Events

```javascript
const { recordEvent } = require('./client.js');

async function sendMultipleEvents() {
  const events = [
    ['web-app', 'page_view'],
    ['mobile-app', 'button_click'],
    ['desktop-app', 'file_save']
  ];
  
  for (const [app, event] of events) {
    const status = await recordEvent(app, event);
    console.log(`✓ ${app}:${event} - Status ${status}`);
  }
}

sendMultipleEvents();
```

**Output:**
```
✓ web-app:page_view - Status 204
✓ mobile-app:button_click - Status 204
✓ desktop-app:file_save - Status 204
```

### Example 4: Using curl

```bash
curl -X POST https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem \
  -H "Content-Type: application/json" \
  -d '{"application": "test-app", "event": "test_event"}'
```

**Output:**
```
(No output - returns 204 No Content on success)
```

**With verbose flag:**
```bash
curl -v -X POST https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem \
  -H "Content-Type: application/json" \
  -d '{"application": "test-app", "event": "test_event"}'
```

**Output:**
```
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* Server certificate:
*  subject: CN=localhost
*  issuer: CN=CertToCert CA
* Client certificate:
*  subject: CN=client
*  issuer: CN=CertToCert CA
> POST /api/events HTTP/1.1
> Host: localhost:8443
> Content-Type: application/json
> Content-Length: 51
> 
< HTTP/1.1 204 No Content
< Date: Mon, 27 Oct 2025 20:00:00 GMT
< Connection: keep-alive
```

---

## Retrieving Events

### Example 1: Get All Events via curl

```bash
curl https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem
```

**Output:**
```json
[
  {
    "application": "local-app",
    "event": "button_press",
    "timestamp": "2025-10-27T20:36:53.704Z"
  },
  {
    "application": "web-app",
    "event": "page_view",
    "timestamp": "2025-10-27T20:37:12.123Z"
  },
  {
    "application": "mobile-app",
    "event": "button_click",
    "timestamp": "2025-10-27T20:37:15.456Z"
  }
]
```

### Example 2: Pretty Print with jq

```bash
curl -s https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem | jq '.'
```

**Output:**
```json
[
  {
    "application": "local-app",
    "event": "button_press",
    "timestamp": "2025-10-27T20:36:53.704Z"
  },
  {
    "application": "web-app",
    "event": "page_view",
    "timestamp": "2025-10-27T20:37:12.123Z"
  }
]
```

### Example 3: Filter Events by Application

```bash
curl -s https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem | \
  jq '.[] | select(.application == "web-app")'
```

**Output:**
```json
{
  "application": "web-app",
  "event": "page_view",
  "timestamp": "2025-10-27T20:37:12.123Z"
}
```

### Example 4: Count Events by Application

```bash
curl -s https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem | \
  jq 'group_by(.application) | map({application: .[0].application, count: length})'
```

**Output:**
```json
[
  {
    "application": "desktop-app",
    "count": 1
  },
  {
    "application": "local-app",
    "count": 1
  },
  {
    "application": "mobile-app",
    "count": 2
  },
  {
    "application": "web-app",
    "count": 3
  }
]
```

---

## API Response Examples

### Successful Event Creation

**Request:**
```http
POST /api/events HTTP/1.1
Host: localhost:8443
Content-Type: application/json

{
  "application": "my-app",
  "event": "user_signup"
}
```

**Response:**
```http
HTTP/1.1 204 No Content
Date: Mon, 27 Oct 2025 20:00:00 GMT
```

### Successful Event Retrieval

**Request:**
```http
GET /api/events HTTP/1.1
Host: localhost:8443
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Mon, 27 Oct 2025 20:00:00 GMT

[
  {
    "application": "my-app",
    "event": "user_signup",
    "timestamp": "2025-10-27T20:00:00.123Z"
  }
]
```

---

## Error Responses

### Missing Application Field

**Request:**
```bash
curl -X POST https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem \
  -H "Content-Type: application/json" \
  -d '{"event": "test_event"}'
```

**Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: text/plain

Missing application or event
```

### Missing Event Field

**Request:**
```bash
curl -X POST https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem \
  -H "Content-Type: application/json" \
  -d '{"application": "test-app"}'
```

**Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: text/plain

Missing application or event
```

### Missing Client Certificate

**Request:**
```bash
curl https://localhost:8443/api/events
```

**Response:**
```
curl: (35) error:1401E412:SSL routines:CONNECT_CR_FINISHED:sslv3 alert bad certificate
```

### Invalid Client Certificate

**Request:**
```bash
curl https://localhost:8443/api/events \
  --cert invalid-cert.pem \
  --key invalid-key.pem \
  --cacert certs/ca-cert.pem
```

**Response:**
```
curl: (58) unable to load client cert: -8018 (SEC_ERROR_BAD_SIGNATURE)
```

---

## Integration Examples

### Express.js Application

```javascript
const express = require('express');
const { recordEvent } = require('./path/to/certtocert/client.js');

const app = express();

// Track page views
app.use((req, res, next) => {
  recordEvent('my-website', 'page_view').catch(console.error);
  next();
});

// Track specific events
app.post('/purchase', async (req, res) => {
  // Process purchase...
  
  await recordEvent('my-website', 'purchase_completed');
  
  res.json({ success: true });
});

app.listen(3000);
```

### Command-Line Script

```javascript
#!/usr/bin/env node
const { recordEvent } = require('./client.js');

const app = process.argv[2] || 'script';
const event = process.argv[3] || 'run';

recordEvent(app, event)
  .then(() => console.log('✓ Event tracked'))
  .catch(err => {
    console.error('✗ Failed to track event:', err.message);
    process.exit(1);
  });
```

**Usage:**
```bash
$ ./track-event.js my-script script_executed
✓ Event tracked
```

### Monitoring Script

```javascript
const { recordEvent } = require('./client.js');

// Track system health every minute
setInterval(async () => {
  const memUsage = process.memoryUsage();
  const event = memUsage.heapUsed > 100_000_000 
    ? 'high_memory_usage' 
    : 'normal_operation';
  
  await recordEvent('system-monitor', event);
  console.log(`Tracked: ${event}`);
}, 60_000);
```

### Testing with Jest

```javascript
const { recordEvent } = require('./client.js');

describe('Analytics', () => {
  test('records events successfully', async () => {
    const status = await recordEvent('test-app', 'test_event');
    expect(status).toBe(204);
  });
  
  test('handles connection errors', async () => {
    // Temporarily stop the server to test error handling
    await expect(recordEvent('app', 'event'))
      .rejects.toThrow();
  });
});
```

---

## Dashboard API Usage

### Fetch Events in Browser

```javascript
// In browser console or dashboard.js
fetch('/api/events')
  .then(response => response.json())
  .then(events => {
    console.log('Total events:', events.length);
    console.log('Events:', events);
  });
```

**Console Output:**
```
Total events: 8
Events: Array(8)
  0: {application: "web-app", event: "page_view", timestamp: "2025-10-27T20:00:00.000Z"}
  1: {application: "web-app", event: "button_click", timestamp: "2025-10-27T20:01:00.000Z"}
  2: {application: "mobile-app", event: "app_start", timestamp: "2025-10-27T20:02:00.000Z"}
  ...
```

### Send Event from Browser

```javascript
// Send event via dashboard
fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    application: 'web-dashboard',
    event: 'card_created'
  })
})
.then(response => {
  if (response.ok) {
    console.log('✓ Event sent successfully');
  }
});
```

**Console Output:**
```
✓ Event sent successfully
```

---

## Performance Metrics

### Load Testing Example

```bash
# Send 100 events rapidly
for i in {1..100}; do
  node -e "require('./client.js').recordEvent('load-test', 'event_$i')" &
done
wait
echo "Sent 100 events"
```

### Measuring Response Time

```bash
time curl -X POST https://localhost:8443/api/events \
  --cert certs/client-cert.pem \
  --key certs/client-key.pem \
  --cacert certs/ca-cert.pem \
  -H "Content-Type: application/json" \
  -d '{"application": "test", "event": "timing_test"}'
```

**Output:**
```
real    0m0.045s
user    0m0.012s
sys     0m0.008s
```

---

## Summary

- **POST /api/events** - Send events (returns 204)
- **GET /api/events** - Retrieve all events (returns JSON array)
- All requests require valid client certificate
- Events stored in-memory (reset on server restart)
- Timestamps automatically added in ISO 8601 format
- Compatible with curl, Node.js, and browser fetch API

For more information, see the [USER_GUIDE.md](../USER_GUIDE.md).
