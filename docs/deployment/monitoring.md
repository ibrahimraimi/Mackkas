# Monitoring Setup

Ensuring the health and performance of the Mackkas platform.

## Health Checks
- `/api/health` (Planned): Returns 200 OK if service and database are healthy.

## Logging
- **Application Logs:** Piped to `journalctl` in production environments.
- **Error Tracking:** Planned integration with Sentry for real-time error reporting.

## Metrics
- **Uptime:** Monitored via UptimeRobot or similar service.
- **Performance:** Regular Lighthouse audits in the build pipeline.
