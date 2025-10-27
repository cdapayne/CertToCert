# Changelog

All notable changes to CertToCert will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation suite
  - README.md with project overview
  - USER_GUIDE.md with detailed instructions
  - QUICKSTART.md for rapid setup
  - CONTRIBUTING.md with contribution guidelines
  - API_EXAMPLES.md with comprehensive API documentation
  - ASCII_DIAGRAMS.md with terminal-friendly visualizations
- Visual documentation
  - Architecture diagram (SVG)
  - Workflow diagram (SVG)
  - Screenshot placeholders and descriptions
- Enhanced documentation structure
  - docs/ directory for organized documentation
  - docs/images/ for diagrams and screenshots

## [1.0.0] - 2024-10-15

### Added
- Initial release of CertToCert
- Mutual TLS (mTLS) authentication system
- HTTPS server with client certificate validation
- Node.js client for sending analytics events
- Interactive web dashboard
  - Multiple chart types (Bar, Line, Pie, Doughnut, Radar, Polar Area)
  - Drag-and-drop card arrangement
  - Customizable visualization cards
  - Test event sender interface
- REST API for event tracking
  - POST /api/events - Send events
  - GET /api/events - Retrieve events
- Certificate generation script
  - CA certificate creation
  - Server certificate generation
  - Client certificate generation
- Web dashboard features
  - Real-time event visualization
  - Chart.js integration
  - LocalStorage-based card persistence
  - Responsive grid layout
  - Card creation and removal
  - Live chart preview

### Security
- Mutual TLS implementation
- Certificate-based client authentication
- Self-signed certificate generation for development
- Encrypted HTTPS communications

[Unreleased]: https://github.com/cdapayne/CertToCert/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/cdapayne/CertToCert/releases/tag/v1.0.0
