# Update Process

Guidelines for safely updating the Mackkas platform.

## Minor Updates
1. Pull changes: `git pull origin develop`.
2. Install new dependencies: `pip install -r requirements.txt`.
3. Restart service.

## Major Updates
1. Put site in maintenance mode (redirect to static page).
2. Back up `mackkas.db`.
3. Pull changes and run migrations.
4. Verify on staging.
5. Deploy to production.

## Troubleshooting Updates
If an update fails:
1. Roll back Git: `git reset --hard HEAD@{1}`.
2. Restore database: `cp mackkas.db.bak mackkas.db`.
3. Restart service and investigate logs.
