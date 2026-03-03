# Testing Guide

Quality assurance is a priority in Mackkas development.

## Unit Testing
We use `pytest` for backend testing.
- Place tests in the `server/tests` directory.
- Use mocks for external dependencies like the database.

## Running Tests
```bash
pytest server/tests
```

## Manual Verification
1. Verify responsiveness on Chrome DevTools (Mobile/Tablet).
2. Check authentication flows (Signup -> Login -> Logout).
3. Verify cart persistence (Add item -> Refresh -> Check cart).
4. Run Lighthouse audit for performance/accessibility metrics.

## Future Plans
- Implement end-to-end (E2E) testing with Playwright.
- Integrate automated testing into the CI/CD pipeline.
