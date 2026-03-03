# Shopping Cart Feature

The shopping cart allows users to collect items for purchase and persists across sessions.

## Functionality
- **Add to Cart:** Users can add products from the catalog.
- **Persistence:** Cart contents are saved to the backend database if the user is logged in.
- **Quantity Management:** Users can increase or decrease item quantities directly in the cart.
- **Totals Calculation:** Automatic calculation of the grand total price.

## Technical Details
- **Frontend Logic:** `product-catalog.js` manages state and syncing.
- **API Endpoints:**
  - `GET /api/cart`: Fetches saved items.
  - `POST /api/cart`: Syncs the current state to the database.
- **Persistence:** Uses the `CartItem` model in `app.py`.

## User Experience
- Sliding cart panel for easy access.
- Real-time updates without page reloads.
- Visual feedback when an item is already in the cart.
