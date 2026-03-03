# Authentication API

Endpoints for managing user authentication and sessions.

## 1. Login
Authenticates a user and starts a session.

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Payload**:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```
- **Response (200 OK)**:
```json
{
  "message": "Login successful",
  "user": {
    "username": "your_username"
  }
}
```

## 2. Signup
Registers a new user account.

- **Endpoint**: `/api/auth/signup`
- **Method**: `POST`
- **Payload**:
```json
{
  "username": "your_username",
  "email": "user@example.com",
  "password": "your_password"
}
```
- **Response (201 Created)**:
```json
{
  "message": "Account created successfully"
}
```

## 3. Logout
Clears the user session.

- **Endpoint**: `/logout`
- **Method**: `GET`
- **Behavior**: Redirects to the login page.
