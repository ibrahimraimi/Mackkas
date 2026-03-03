# CI/CD Pipeline

Automated workflows for testing and deployment.

## Tooling
- **GitHub Actions**: Primary CI/CD platform.
- **Pytest**: For backend testing.
- **Flake8**: For code linting.

## Workflow Example
1. **Trigger:** Push to `main` or `develop` branches.
2. **Setup:** Install Python and project dependencies.
3. **Lint:** Run `flake8 .`.
4. **Test:** Run `pytest`.
5. **Deploy:** If on `main`, push Docker image to registry and update production server.
