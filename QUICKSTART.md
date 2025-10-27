# CertToCert Quick Start Guide

Get up and running with CertToCert in 5 minutes!

## Prerequisites
- Node.js (v14+)
- npm
- OpenSSL

## Quick Setup

### 1. Clone and Install
```bash
git clone https://github.com/cdapayne/CertToCert.git
cd CertToCert
npm install
```

### 2. Generate Certificates
```bash
bash scripts/generate-certs.sh
```

### 3. Start the Server
```bash
npm start
```

You should see: `Analytics server listening on https://localhost:8443`

### 4. Send Test Events

**Option A: Using Node.js Client** (easiest)
```bash
# In a new terminal
npm run client
```

**Option B: Send Multiple Events**
```bash
node -e "
const {recordEvent} = require('./client.js');
(async () => {
  await recordEvent('web-app', 'page_view');
  await recordEvent('mobile-app', 'button_click');
  await recordEvent('web-app', 'form_submit');
  console.log('Events sent!');
})();
"
```

### 5. Access the Dashboard

#### Browser Setup (One-Time)

1. **Convert certificate to browser format:**
   ```bash
   openssl pkcs12 -export -out certs/client.p12 \
     -inkey certs/client-key.pem \
     -in certs/client-cert.pem \
     -certfile certs/ca-cert.pem
   ```
   Enter a password when prompted (remember it!)

2. **Import certificate to browser:**
   
   **Chrome/Edge:**
   - Settings → Privacy and security → Security → Manage certificates
   - Import → Select `certs/client.p12`
   - Enter your password
   
   **Firefox:**
   - Settings → Privacy & Security → View Certificates
   - Your Certificates → Import → Select `certs/client.p12`
   
   **Safari (macOS):**
   - Double-click `certs/client.p12`
   - Enter password

3. **Navigate to dashboard:**
   ```
   https://localhost:8443
   ```

## Verify Everything Works

### Check API
```bash
curl --cert certs/client-cert.pem \
     --key certs/client-key.pem \
     --cacert certs/ca-cert.pem \
     https://localhost:8443/api/events
```

You should see JSON array of events.

## What's Next?

### Create Custom Dashboard Cards
1. Navigate to https://localhost:8443
2. Click **"Add Card"**
3. Configure:
   - Title: "My Events"
   - Group By: "application" or "event"
   - Chart Type: Choose any (Bar, Pie, Line, etc.)
4. Click **"Add to Dashboard"**

### Integrate with Your Application
```javascript
const { recordEvent } = require('./client.js');

// In your app code
await recordEvent('my-app', 'user_signup');
await recordEvent('my-app', 'purchase_complete');
```

## Troubleshooting

**Server won't start?**
- Check if port 8443 is available: `lsof -i :8443`
- Verify certificates exist: `ls -la certs/`

**Can't access dashboard?**
- Ensure certificate is imported to browser
- Try accepting the security warning
- Check browser console for errors

**Events not appearing?**
- Verify server is running
- Check the API: `curl https://localhost:8443/api/events ...`
- Send a test event: `npm run client`

## Full Documentation

For detailed documentation, see [USER_GUIDE.md](USER_GUIDE.md)

## Architecture

CertToCert uses mutual TLS authentication:
- **Server** validates client certificates
- **Client** validates server certificate
- **CA** signs both certificates
- All traffic is encrypted and authenticated

---

**Ready to explore?** Start sending events and create beautiful analytics dashboards! 📊
