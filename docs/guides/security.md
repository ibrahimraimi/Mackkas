# Security Best Practices

Security is a core component of the Mackkas modernization plan.

## Implemented Measures

### 1. Data Protection
- **Password Hashing:** Using `scrypt` via Werkzeug's `generate_password_hash`.
- **Database Safety:** SQLite is stored outside the web root.

### 2. Session Security
- **Secure Cookies:** Cryptographically signed session cookies using a secret key.
- **Session Isolation:** Users can only access and modify their own cart and data.

### 3. Frontend Security
- **XSS Prevention:** Use of `textContent` and `createElement` instead of raw `innerHTML` for dynamic content.
- **Content Security Policy (Planned):** Implementation of headers to restrict resource loading.

## Security Checklist
- [x] Change the `SECRET_KEY` in `app.py` before production.
- [x] Use HTTPS for all production traffic.
- [x] Sanitize all user inputs on the backend.
- [x] Keep dependencies updated via regular audits.
