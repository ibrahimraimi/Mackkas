# Order API

Endpoints for managing user orders and transactions (Planned).

## Current Flow
Orders are currently simulated. Clicking "Buy Now" in the cart clears the cart and simulates a successful transaction in the UI.

## Future Endpoints
- `GET /api/orders`: List user's past orders.
- `POST /api/orders`: Create a new order from cart.
- `GET /api/orders/:id`: Get order details and tracking.
