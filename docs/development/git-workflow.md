# Git Workflow

A consistent Git workflow ensures a clean project history.

## Branching Model
- `main`: Production-ready code.
- `develop`: Ongoing development.
- `feature/*`: New features or improvements.
- `bugfix/*`: Bug repairs.

## Commit Messages
Use the following format: `<type>(<scope>): <subject>`
- **feat:** A new feature.
- **fix:** A bug fix.
- **docs:** Documentation changes.
- **style:** Formatting, missing semicolons, etc.
- **refactor:** Code change that neither fixes a bug nor adds a feature.

Example: `feat(auth): add password hashing to signup`

## Pull Request Process
1. Create a branch from `develop`.
2. Commit your changes with descriptive messages.
3. Push to your fork and create a Pull Request.
4. Ensure all tests pass before merging.
