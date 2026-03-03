# Configuration

Manage environment-specific settings for the Mackkas platform.

## Environment Variables
- `SECRET_KEY`: Used for signing cookies.
- `DATABASE_URL`: URI for the database (defaults to `sqlite:///mackkas.db`).
- `FLASK_ENV`: Set to `development` or `production`.

## App Configuration
Settings in `app.py`:
- `SQLALCHEMY_TRACK_MODIFICATIONS`: Set to `False` to save resources.
- `SESSION_COOKIE_HTTPONLY`: Set to `True` for security.
