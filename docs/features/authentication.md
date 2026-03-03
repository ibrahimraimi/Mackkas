# Authentication Feature

Mackkas provides a secure authentication system for its users.

## Core Functionality
- **Registration:** Users can create an account with a unique username and email.
- **Login:** Secure login using password verification.
- **Session Persistence:** Users stay logged in across page refreshes via Flask sessions.
- **Password Security:** Multi-layered security using `scrypt` hashing via Werkzeug.

## Components
- **Frontend:** `signup-page.js`, `login-page.js`
- **Templates:** `signup-page.html`, `login-page.html`
- **Backend:** `api/auth/signup`, `api/auth/login` in `app.py`.

## Security Measures
- [x] Passwords are never stored in plain text.
- [x] Input validation on both client and server sides.
- [x] Protection against session hijacking via signed cookies.
- [x] TextContent used to prevent XSS in UI updates.
