# API Design

The Mackkas API follows RESTful principles for data exchange between the frontend and backend.

## Design Philosophy
- **JSON for Data Exchange**: All requests and responses are in JSON format.
- **RESTful Endpoints**: Resources are accessed via clear, predictable URIs.
- **Statelessness**: The API is largely stateless, with user sessions handled by Flask.

## Base URL
All API endpoints are prefixed with `/api`.

## Endpoint Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate a user and start a session. |
| `POST` | `/api/auth/signup` | Register a new user account. |
| `GET` | `/api/products` | Retrieve all products in the catalog. |
| `GET` | `/api/cart` | Retrieve the current user's cart items. |
| `POST` | `/api/cart` | Sync/update the current user's cart. |

## Standards
- **Content-Type**: `application/json`
- **Response Format**:
  - Success: `{"message": "success", "data": {...}}`
  - Error: `{"message": "error explanation"}`
