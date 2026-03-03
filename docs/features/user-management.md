# User Management Feature

Managing user accounts and profiles in Mackkas.

## Current Functionality
- **Self-Service Support:** Users can register their own accounts.
- **Login/Logout:** Secure session management.
- **Identity Display:** The username is dynamically displayed in the navigation bar upon login.

## Technical Implementation
- **Data Model:** `User` table in `app.py`.
- **Session Logic:** Flask `session` stores the `user_id` and `username`.
- **Frontend Sync:** `sessionStorage` mirrors the basic user info for UI updates without API roundtrips.

## Planned Features
- **Profile Page:** Edit email, update password, and view order history.
- **Avatar Support:** Upload and manage user profile pictures.
- **Admin Dashboard:** Manage all users and product listings via a secure interface.
