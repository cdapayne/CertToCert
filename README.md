# CertToCert 🔐📊

An analytics dashboard system with **mutual TLS authentication** for secure event tracking and visualization.

![CertToCert Architecture](docs/images/architecture.svg)

## Features

- ✅ **Mutual TLS Authentication** - Both client and server authenticate using certificates
- 📊 **Interactive Analytics Dashboard** - Visualize your data with multiple chart types
- 🔄 **Real-time Event Tracking** - Send and view events in real-time
- 🎨 **Customizable Dashboards** - Create, arrange, and remove visualization cards
- 🔐 **Secure by Default** - All communications encrypted and authenticated
- 📈 **Multiple Chart Types** - Bar, Line, Pie, Doughnut, Radar, and Polar Area charts

## Quick Start

```bash
# Clone and install
git clone https://github.com/cdapayne/CertToCert.git
cd CertToCert
npm install

# Generate certificates
bash scripts/generate-certs.sh

# Start server
npm start

# Send test events (in another terminal)
npm run client
```

📖 **[Read the Quick Start Guide →](QUICKSTART.md)**

## Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes
- **[Complete User Guide](USER_GUIDE.md)** - Comprehensive documentation with detailed instructions
- **[API Reference](USER_GUIDE.md#api-reference)** - API endpoints and usage

## What is Mutual TLS?

Mutual TLS (mTLS) is a two-way authentication where both the client and server verify each other's identity using certificates. This provides:

1. **Authentication** - Ensures both parties are who they claim to be
2. **Encryption** - All data is encrypted in transit
3. **Integrity** - Data cannot be tampered with
4. **Non-repudiation** - Actions can be traced to specific certificates

## Architecture

```
┌──────────────┐         mTLS          ┌──────────────┐
│              │ ◄──────────────────►  │              │
│ Node Client  │  (Client Cert Auth)   │ HTTPS Server │
│ (client.js)  │                       │ (server.js)  │
└──────────────┘                       └──────┬───────┘
                                              │
                                              │ HTTPS
                                              │
                                       ┌──────▼───────┐
                                       │              │
                                       │ Web Dashboard│
                                       │  (Browser)   │
                                       └──────────────┘
```

## Components

### 1. Server (`server.js`)
- HTTPS server on port 8443
- Requires valid client certificates
- Provides REST API for events
- Serves web dashboard

### 2. Node.js Client (`client.js`)
- Sends events to the server
- Uses client certificate for authentication
- Can be integrated into any Node.js application

### 3. Web Dashboard (`public/`)
- Interactive analytics interface
- Create custom visualization cards
- Drag-and-drop card arrangement
- Multiple chart types with Chart.js
- Send test events through UI

### 4. Certificate Generation (`scripts/generate-certs.sh`)
- Creates CA certificate
- Generates server certificate
- Generates client certificate
- All certificates signed by the CA

## Usage Examples

### Send Events from Node.js

```javascript
const { recordEvent } = require('./client.js');

// Track user actions
await recordEvent('web-app', 'user_login');
await recordEvent('web-app', 'button_click');
await recordEvent('mobile-app', 'app_start');
```

### Query Events via API

```bash
curl --cert certs/client-cert.pem \
     --key certs/client-key.pem \
     --cacert certs/ca-cert.pem \
     https://localhost:8443/api/events
```

### Create Dashboard Cards

1. Navigate to `https://localhost:8443`
2. Click **"Add Card"**
3. Configure title, grouping, and chart type
4. View real-time preview
5. Add to dashboard

## Requirements

- **Node.js** v14 or higher
- **npm** (comes with Node.js)
- **OpenSSL** (for certificate generation)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Run client
npm run client

# Generate new certificates
bash scripts/generate-certs.sh
```

## Security Considerations

⚠️ **Important Security Notes:**

- The included certificate generation script creates **self-signed certificates** suitable for development and testing
- **Never commit private keys** (`.gitignore` already excludes `*-key.pem` files)
- For production use:
  - Use certificates from a trusted CA
  - Implement certificate rotation policies
  - Use environment variables for sensitive configuration
  - Enable proper logging and monitoring
  - Implement rate limiting and request validation

## Project Structure

```
CertToCert/
├── certs/                  # Certificate storage
│   ├── ca-cert.pem        # CA certificate
│   ├── ca-key.pem         # CA private key
│   ├── server-cert.pem    # Server certificate
│   ├── server-key.pem     # Server private key
│   ├── client-cert.pem    # Client certificate
│   └── client-key.pem     # Client private key
├── docs/                   # Documentation
│   └── images/            # Diagrams and screenshots
├── public/                 # Web dashboard files
│   ├── index.html         # Main dashboard
│   ├── reports.html       # Create report card
│   ├── test-event.html    # Send test events
│   ├── dashboard.js       # Dashboard utilities
│   └── style.css          # Styling
├── scripts/
│   └── generate-certs.sh  # Certificate generation
├── server.js              # HTTPS server with mTLS
├── client.js              # Node.js client
├── package.json           # Dependencies
├── QUICKSTART.md          # Quick start guide
└── USER_GUIDE.md          # Complete documentation
```

## API Endpoints

### POST `/api/events`
Send an event to be tracked.

**Request:**
```json
{
  "application": "my-app",
  "event": "button_click"
}
```

**Response:** `204 No Content`

### GET `/api/events`
Retrieve all tracked events.

**Response:**
```json
[
  {
    "application": "web-app",
    "event": "page_view",
    "timestamp": "2025-10-27T20:00:00.000Z"
  }
]
```

## Troubleshooting

### Common Issues

**Certificate errors in browser:**
- Import `client.p12` into your browser's certificate manager
- Trust the CA certificate to avoid security warnings

**Server won't start:**
- Ensure certificates exist: `ls -la certs/`
- Check port 8443 isn't in use: `lsof -i :8443`

**Client connection refused:**
- Verify server is running: `npm start`
- Check certificates are valid

See the [Troubleshooting section](USER_GUIDE.md#troubleshooting) in the User Guide for more help.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License

## Support

- **Issues:** https://github.com/cdapayne/CertToCert/issues
- **Documentation:** [USER_GUIDE.md](USER_GUIDE.md)

---

**Built with ❤️ using Node.js, Express, and Chart.js**
