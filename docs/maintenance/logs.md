# Log Management

Tracking application behavior and errors.

## Log Levels
- **INFO:** General operational information.
- **WARNING:** Potentially harmful situations.
- **ERROR:** Operation-critical issues.

## Storage
- **Local:** `mackkas-error.log` and `mackkas-access.log`.
- **System:** `journalctl` for system-wide service logs.

## Analysis
- Use `grep` or `awk` for searching logs locally.
- Use a log aggregator (e.g., ELK stack or Papertrail) in production for real-time analysis.
