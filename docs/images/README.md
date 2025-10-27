# Documentation Images

This directory contains screenshots and diagrams for the CertToCert User Guide.

## How to Generate Screenshots

Since CertToCert uses mutual TLS authentication, accessing the web interface requires:
1. Generating certificates using `scripts/generate-certs.sh`
2. Converting the client certificate to PKCS#12 format
3. Importing the certificate into your browser
4. Trusting the CA certificate

### Browser Setup Commands

```bash
# Convert certificate to PKCS#12 format
openssl pkcs12 -export -out certs/client.p12 \
  -inkey certs/client-key.pem \
  -in certs/client-cert.pem \
  -certfile certs/ca-cert.pem

# Then import client.p12 into your browser's certificate manager
```

### Taking Screenshots

After setup, navigate to `https://localhost:8443` and capture:
- Main dashboard with multiple cards
- Create Report Card page with preview
- Send Test Event page
- API response in browser developer tools

## Placeholder Images

The following placeholder descriptions indicate what screenshots should show:

### installation.png
Terminal output showing successful `npm install` with package count

### certificates.png
Terminal output showing successful certificate generation from `generate-certs.sh`

### server-running.png
Terminal showing server startup message: "Analytics server listening on https://localhost:8443"

### client-events.png
Terminal output showing client sending events successfully

### dashboard-access.png
Browser certificate selection dialog or browser showing https://localhost:8443

### main-dashboard.png
Main dashboard page with multiple chart cards displaying analytics data

### create-report.png
Create Report Card page showing form fields and live preview

### send-event.png
Send Test Event page with form to submit application and event data

### dashboard-interactions.png
Dashboard with arrows/annotations showing drag-and-drop and remove functionality
