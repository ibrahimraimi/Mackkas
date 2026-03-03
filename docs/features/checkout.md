# Checkout Process

The checkout process in Mackkas is currently handled as a simulated transaction.

## Current Flow
1. **Cart Review:** The user opens the cart panel and reviews items/totals.
2. **Purchase Trigger:** Clicking the "Buy Now" button.
3. **Simulation:**
   - A "Pending" notification is shown for 2 seconds.
   - A "Success" notification follows.
   - The UI cart is cleared, and the backend cart is emptied.
4. **Completion:** User is returned to the catalog.

## Planned Improvements
- **Order Creation:** Generating a persistent order record in the database.
- **Shipping Details:** A dedicated checkout page to collect address and contact information.
- **Payment Integration:** Integration with a payment gateway (e.g., Stripe, PayPal).
- **Confirmation Email:** Automated notification upon successful purchase.
