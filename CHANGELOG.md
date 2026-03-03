# Changelog

All notable changes to the Mackkas platform will be documented in this file.

## [1.0.0] - 2026-03-03
### Added
- **Backend Infrastructure:** Initialized Flask server with SQLite integration.
- **Authentication:** Implemented secure login and signup with password hashing.
- **Product Catalog:** Created dynamic product loading via API.
- **Cart Persistence:** Added backend support for saving user cart items.
- **Documentation:** Created comprehensive documentation suite in `docs/`.
- **Seeding:** Added `seed.py` for automated database population.

### Enhanced
- **Modern UI:** Updated all templates with Flask syntax and static assets.
- **Project Structure:** Reorganized codebase into a clean, modular directory structure.
- **Image Naming:** Renamed all images to follow a consistent kebab-case convention.
- **File Naming:** Applied project-wide kebab-case naming convention to all code files.

### Fixed
- **Security:** Replaced `sessionStorage` password storage with secure server-side verification.
- **XSS:** Switched to `textContent` for dynamic UI updates to prevent script injection.
- **Maintainability:** Refactored monolithic CSS and JS into organized files.

---
*Follows Semantic Versioning.*
