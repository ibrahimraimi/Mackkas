# Rate Limiting

Currently, there are no hard rate limits implemented on the local development server.

## Planned Implementation
For the production environment, the following limits are planned:
- **Authentication Routes:** 5 requests per minute per IP.
- **Product Catalog:** 100 requests per minute per IP.
- **Cart Sync:** 20 requests per minute per user.

## Headers
When implemented, the API will return:
- `X-RateLimit-Limit`: Maximum requests per window.
- `X-RateLimit-Remaining`: Remaining requests in current window.
- `X-RateLimit-Reset`: Time until window reset.
