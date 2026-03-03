# Maintenance Guides

Procedures for keeping the Mackkas platform healthy.

## Backup Process
1. Stop the application.
2. Copy the `mackkas.db` file to a secure off-site location.
3. Keep the last 7 daily backups.

## Update Process
1. Pull latest changes from Git.
2. Update dependencies: `pip install -r requirements.txt --upgrade`.
3. Run any database migrations if necessary.
4. Restart the Flask application.

## Database Migrations
We use a simple approach for now. For schema changes:
1. Back up existing data.
2. Update the models in `app.py`.
3. Update `seed.py` with the new schema.
4. Re-seed or use an `ALTER TABLE` script.

## Log Management
- Application logs are printed to `stdout` in development.
- In production, use a tool like `gunicorn` to pipe logs to `/var/log/mackkas/app.log`.
