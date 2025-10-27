# CertToCert Visual Diagrams

This file contains ASCII art diagrams that can be displayed in terminals and markdown files.

## Certificate Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Certificate Authority (CA)                            │
│                                                                           │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐          │
│  │   CA Key     │ ───▶ │   CA Cert    │ ───▶ │ Signs Other  │          │
│  │   (Private)  │      │   (Public)   │      │ Certificates │          │
│  └──────────────┘      └──────────────┘      └──────────────┘          │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │   Server Certificate  │       │   Client Certificate  │
    │                       │       │                       │
    │  ┌─────────────────┐ │       │  ┌─────────────────┐ │
    │  │ server-cert.pem │ │       │  │ client-cert.pem │ │
    │  │ server-key.pem  │ │       │  │ client-key.pem  │ │
    │  └─────────────────┘ │       │  └─────────────────┘ │
    │                       │       │                       │
    │  CN: localhost        │       │  CN: client           │
    │  Valid for: 10 years  │       │  Valid for: 10 years  │
    └───────────────────────┘       └───────────────────────┘
                │                               │
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │   Used by Server      │       │   Used by Client      │
    │   (server.js)         │       │   (client.js)         │
    │                       │       │                       │
    │   • Proves server     │       │   • Proves client     │
    │     identity          │       │     identity          │
    │   • Encrypts traffic  │       │   • Encrypts traffic  │
    └───────────────────────┘       └───────────────────────┘
```

## Mutual TLS Handshake

```
┌─────────────┐                                      ┌─────────────┐
│   Client    │                                      │   Server    │
│             │                                      │             │
└──────┬──────┘                                      └──────┬──────┘
       │                                                    │
       │  1. ClientHello (supported ciphers)               │
       ├──────────────────────────────────────────────────▶│
       │                                                    │
       │  2. ServerHello + Server Certificate              │
       │◀──────────────────────────────────────────────────┤
       │                                                    │
       │  3. Client verifies Server Cert with CA           │
       ├────┐                                               │
       │    │ ✓ Valid                                      │
       │◀───┘                                               │
       │                                                    │
       │  4. Server requests Client Certificate            │
       │◀──────────────────────────────────────────────────┤
       │                                                    │
       │  5. Client sends Client Certificate               │
       ├──────────────────────────────────────────────────▶│
       │                                                    │
       │  6. Server verifies Client Cert with CA           │
       │                                                ┌───┤
       │                                                │   │
       │                                 ✓ Valid        └──▶│
       │                                                    │
       │  7. Encrypted session established                 │
       │◀──────────────────────────────────────────────────┤
       │                                                    │
       │  8. Secure data exchange                          │
       │◀─────────────────────────────────────────────────▶│
       │                                                    │
```

## Event Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                         Event Recording Flow                          │
└──────────────────────────────────────────────────────────────────────┘

    Application Code
         │
         │ recordEvent('app', 'event')
         │
         ▼
┌──────────────────┐
│   client.js      │
│                  │
│  1. Load certs   │
│  2. Create HTTPS │
│     request      │
│  3. Authenticate │
│     with cert    │
└────────┬─────────┘
         │
         │ POST /api/events
         │ {application, event}
         │ + Client Certificate
         │
         ▼
┌──────────────────┐
│   server.js      │
│                  │
│  1. Verify cert  │
│  2. Parse JSON   │
│  3. Store event  │
│  4. Return 204   │
└────────┬─────────┘
         │
         │ Event stored in memory
         │
         ▼
┌──────────────────┐
│   Event Array    │
│                  │
│  [{             │
│    application, │
│    event,       │
│    timestamp    │
│  }]            │
└────────┬─────────┘
         │
         │ GET /api/events
         │
         ▼
┌──────────────────┐
│   Dashboard      │
│                  │
│  1. Fetch events │
│  2. Group data   │
│  3. Render chart │
└──────────────────┘
```

## Dashboard Component Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Analytics Dashboard                           │
│                      https://localhost:8443                          │
├─────────────────────────────────────────────────────────────────────┤
│  [Analytics Dashboard]           [Add Card] [Send Event]            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────┐    ┌─────────────────────────┐       │
│  │ Events by Application ×│    │ Events by Type       ×│       │
│  │─────────────────────────│    │─────────────────────────│       │
│  │                         │    │                         │       │
│  │    ▂▄▆█               │    │        ═══             │       │
│  │  ▂▄▆█                 │    │     ░░░░░░░░           │       │
│  │▂▄▆█                   │    │   ░░░░░░░░░░░░         │       │
│  │                         │    │  ░░░░░░░░░░░░░░        │       │
│  │ web-app mobile desktop  │    │  page button  app     │       │
│  │                         │    │  view  click  start   │       │
│  └─────────────────────────┘    └─────────────────────────┘       │
│                                                                      │
│  ┌─────────────────────────┐    ┌─────────────────────────┐       │
│  │ Timeline              ×│    │ Distribution        ×│       │
│  │─────────────────────────│    │─────────────────────────│       │
│  │                         │    │                         │       │
│  │     ╱╲                 │    │         ●               │       │
│  │    ╱  ╲    ╱╲          │    │       ●   ●             │       │
│  │   ╱    ╲  ╱  ╲         │    │     ●       ●           │       │
│  │  ╱      ╲╱    ╲        │    │   ●           ●         │       │
│  │ ╱              ╲       │    │ ●               ●       │       │
│  │                         │    │                         │       │
│  └─────────────────────────┘    └─────────────────────────┘       │
│                                                                      │
│  💡 Drag cards to reorder  •  Click × to remove                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## File Structure

```
CertToCert/
│
├── 📁 certs/                    Certificate storage
│   ├── 🔐 ca-cert.pem           CA certificate (public)
│   ├── 🔑 ca-key.pem            CA private key
│   ├── 🔐 server-cert.pem       Server certificate
│   ├── 🔑 server-key.pem        Server private key
│   ├── 🔐 client-cert.pem       Client certificate
│   ├── 🔑 client-key.pem        Client private key
│   └── 📄 README.md             Certificate documentation
│
├── 📁 docs/                     Documentation
│   └── 📁 images/               Diagrams and screenshots
│       ├── 🖼️  architecture.svg  Architecture diagram
│       ├── 🖼️  workflow.svg      Setup workflow
│       └── 📄 README.md         Image documentation
│
├── 📁 public/                   Web dashboard files
│   ├── 🌐 index.html            Main dashboard page
│   ├── 🌐 reports.html          Create report card
│   ├── 🌐 test-event.html       Send test events
│   ├── 📜 dashboard.js          Dashboard utilities
│   └── 🎨 style.css             Styling
│
├── 📁 scripts/
│   └── 🔧 generate-certs.sh    Certificate generation script
│
├── 🟢 server.js                 HTTPS server with mTLS
├── 🔵 client.js                 Node.js event sender
│
├── 📦 package.json              Dependencies & scripts
├── 📝 README.md                 Project overview
├── 📖 USER_GUIDE.md             Complete user guide
└── 🚀 QUICKSTART.md             Quick setup guide
```

## Chart Types Available

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Bar Chart   │  Line Chart  │  Pie Chart   │  Doughnut    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│    █         │      ╱       │    ╱─────╲   │   ╱─────╲    │
│  █ █         │     ╱        │   │ ░░░░ │   │  │ ░░░ │    │
│  █ █ █       │    ╱ ╲       │   │░░██░░│   │  │░░ ░░│    │
│  █ █ █       │   ╱   ╲      │   │░██ ░░│   │  │░░ ░░│    │
│  █ █ █ █     │  ╱     ╲     │   │██  ░░│   │  │░░░ ░│    │
│  █ █ █ █     │ ╱       ╲    │   │      │   │  │      │    │
│  ▔▔▔▔▔▔▔     │───────────   │    ╲─────╱   │   ╲─────╱    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Radar Chart  │  Polar Area  │              │              │
├──────────────┼──────────────┤              │              │
│     ╱│╲      │    ╱──╲      │              │              │
│    ╱ │ ╲     │   │░░░░│     │              │              │
│   ╱  │  ╲    │  │░░██░░│    │              │              │
│  │   ●   │   │  │░██ ░░│    │              │              │
│   ╲  │  ╱    │  │██  ░░│    │              │              │
│    ╲ │ ╱     │   │░░░░│     │              │              │
│     ╲│╱      │    ╲──╱      │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```
