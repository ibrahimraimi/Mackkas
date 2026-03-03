# Database Migrations

Managing schema changes in the Mackkas database.

## Approach
For the current scale, we use manual migration scripts.

## Steps for Migration
1. **Schema Update:** Modify models in `app.py`.
2. **Migration Script:** Create a Python script to add columns or tables:
```python
from app import db, app
with app.app_context():
    db.engine.execute('ALTER TABLE user ADD COLUMN last_login DATETIME')
```
3. **Execution:** Run the script and verify column addition.

## Tools (Planned)
- Implementation of `Flask-Migrate` (Alembic) for automated versioning and migrations.
