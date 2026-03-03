# Staging Environment

The staging environment is used for final testing before production deployment.

## Purpose
- Test new features in a production-like environment.
- Verify database migrations.
- Run load tests and performance audits.

## Setup
- **URL:** `https://staging.mackkas.com`
- **Database:** `mackkas-staging.db`
- **Sync:** Auto-synchronized with the `develop` branch of the repository.

## Credentials
- Access is restricted to internal team members via IP whitelisting or Basic Auth.
- Use distinct credentials from the production environment.
