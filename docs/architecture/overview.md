# Architecture Overview

Mackkas is built using a modern Client-Server architecture with a clean separation of concerns.

## System Components

### 1. Frontend (Client Layer)
- **Vanilla JavaScript**: Handles UI logic, event listening, and API interaction.
- **HTML/CSS**: Responsible for structure and styling.
- **Fetch API**: Communicates with the backend asynchronously.

### 2. Backend (Application Layer)
- **Flask (Python)**: Provides the RESTful API and template rendering.
- **Route Handlers**: Manage user authentication, product delivery, and cart persistence.
- **Session Management**: Uses Flask-Session for maintaining user state.

### 3. Data Layer
- **SQLite**: A lightweight, file-based relational database.
- **SQLAlchemy ORM**: Interfaces between Python objects and the database tables.

## Data Flow
1. **Request**: User interacts with the UI (e.g., clicks "Add to Cart").
2. **API Call**: Frontend JS sends a `POST` request to `/api/cart`.
3. **Processing**: Flask backend receives the request, validates the session, and updates the database via SQLAlchemy.
4. **Response**: Backend sends a JSON confirmation back to the client.
5. **Update**: Frontend JS receives the response and updates the UI (e.g., increments the cart counter).

## Security Layers
- **Password Hashing**: Stored using `scrypt` hashing via Werkzeug.
- **State Protection**: Input sanitization and semantic HTML to prevent XSS.
- **Session Security**: Cryptographically signed sessions using a `SECRET_KEY`.
