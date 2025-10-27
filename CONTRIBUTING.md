# Contributing to CertToCert

Thank you for your interest in contributing to CertToCert! This document provides guidelines for contributing to the project.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CertToCert.git
   cd CertToCert
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/cdapayne/CertToCert.git
   ```

## Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate certificates** for development:
   ```bash
   bash scripts/generate-certs.sh
   ```

3. **Start the server** in development mode:
   ```bash
   npm start
   ```

4. **Test the client**:
   ```bash
   npm run client
   ```

## Making Changes

### Branch Naming
- `feature/` - New features (e.g., `feature/add-event-filtering`)
- `bugfix/` - Bug fixes (e.g., `bugfix/fix-cert-loading`)
- `docs/` - Documentation updates (e.g., `docs/improve-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-event-handler`)

### Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### Keep Your Branch Updated
```bash
git fetch upstream
git rebase upstream/main
```

## Testing

### Manual Testing

1. **Test server startup**:
   ```bash
   npm start
   # Should see: Analytics server listening on https://localhost:8443
   ```

2. **Test client**:
   ```bash
   npm run client
   # Should see: Event sent with status 204
   ```

3. **Test API**:
   ```bash
   curl --cert certs/client-cert.pem \
        --key certs/client-key.pem \
        --cacert certs/ca-cert.pem \
        https://localhost:8443/api/events
   # Should return JSON array of events
   ```

4. **Test dashboard** (after browser setup):
   - Navigate to https://localhost:8443
   - Create a new card
   - Send a test event
   - Verify the dashboard updates

### Testing Checklist
- [ ] Server starts without errors
- [ ] Client can send events
- [ ] API returns correct responses
- [ ] Dashboard loads and functions
- [ ] Certificates generate correctly
- [ ] Error cases are handled properly

## Documentation

If your changes affect user-facing functionality:

1. **Update relevant documentation**:
   - README.md for major features
   - USER_GUIDE.md for detailed instructions
   - QUICKSTART.md if setup process changes
   - API_EXAMPLES.md for API changes

2. **Add inline comments** for complex code

3. **Update diagrams** if architecture changes

4. **Add examples** for new features

## Submitting Changes

### Before Submitting
1. **Test your changes** thoroughly
2. **Update documentation** as needed
3. **Check for linting errors** (if applicable)
4. **Ensure commits are clean** and well-described

### Commit Messages
Follow the conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add event filtering by date range

Add query parameters to /api/events endpoint to filter events
by start and end date. Updates documentation with examples.

Closes #42
```

```
fix: handle missing certificate files gracefully

Add existence checks for certificate files before attempting
to load them. Provide helpful error messages.
```

### Create Pull Request
1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Reference to related issues (e.g., "Closes #123")
   - Screenshots for UI changes
   - Testing steps

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of the changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   - [ ] Manual testing completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   
   ## Related Issues
   Closes #issue_number
   ```

## Code Style

### JavaScript
- Use ES6+ features where appropriate
- Use `const` by default, `let` when needed
- Use async/await for asynchronous code
- Add JSDoc comments for functions
- Keep functions small and focused

### Formatting
- Indentation: 2 spaces
- Line length: Aim for 80-100 characters
- Semicolons: Use them
- Quotes: Single quotes for strings

### Example
```javascript
/**
 * Records an analytics event
 * @param {string} application - Application name
 * @param {string} event - Event name
 * @returns {Promise<number>} HTTP status code
 */
async function recordEvent(application, event) {
  if (!application || !event) {
    throw new Error('Application and event are required');
  }
  
  const data = JSON.stringify({ application, event });
  // ... rest of implementation
}
```

## Areas for Contribution

### High Priority
- [ ] Add database persistence (PostgreSQL/MongoDB)
- [ ] Implement event retention policies
- [ ] Add data aggregation/analytics endpoints
- [ ] Improve error handling and logging
- [ ] Add rate limiting
- [ ] Create automated tests

### Medium Priority
- [ ] Add event filtering/search
- [ ] Implement user authentication
- [ ] Add more chart types
- [ ] Create export functionality (CSV/JSON)
- [ ] Add real-time updates (WebSocket)
- [ ] Improve dashboard responsiveness

### Documentation
- [ ] Add video tutorials
- [ ] Create more examples
- [ ] Translate documentation
- [ ] Add API client libraries (Python, Go, etc.)
- [ ] Create deployment guides (Docker, K8s)

### Other
- [ ] Performance optimizations
- [ ] Security improvements
- [ ] UI/UX enhancements
- [ ] Mobile-friendly dashboard

## Questions?

If you have questions:
- Check existing [documentation](USER_GUIDE.md)
- Look at [closed issues](https://github.com/cdapayne/CertToCert/issues?q=is%3Aissue+is%3Aclosed)
- Open a new [issue](https://github.com/cdapayne/CertToCert/issues/new) with the "question" label

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

**Thank you for contributing to CertToCert!** 🎉
