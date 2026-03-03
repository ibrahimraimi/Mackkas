# Folder Structure

The project is organized into a clean, modular structure for better maintainability.

```text
Mackkas/
├── app.py                  # Main Flask application
├── seed.py                 # Database initialization script
├── mackkas.db              # SQLite database (generated)
├── static/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # Frontend Logic
│   └── images/             # Product images
├── templates/              # HTML templates
│   ├── index.html          # Landing page
│   ├── Mackkas.html        # Product catalog
│   ├── LoginPage.html      # Login view
│   └── SignUp.html         # Signup view
├── docs/                   # Documentation (this folder)
├── server/                 # Backend-specific files
└── .agent/                 # Agent configuration
```

## Key Directories

### `static/`
Contains all client-side assets that are served directly.
- **`css/`**: Separated into per-page styles (e.g., `Login.css`, `Mackkas.css`).
- **`js/`**: Contains modularized logic (e.g., `LoginPage.js`, `Mackkas.js`).
- **`images/`**: Organized using the kebab-case naming convention.

### `templates/`
Uses Jinja2 syntax to render dynamic content and include static file links using `url_for`.

### `docs/`
Contains comprehensive project documentation across various categories (API, Architecture, Development, etc.).
