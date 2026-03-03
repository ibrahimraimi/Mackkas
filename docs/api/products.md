# Product API

Endpoints for retrieving and filtering product data.

## 1. Get All Products
Retrieves the full list of products from the database.

- **Endpoint**: `/api/products`
- **Method**: `GET`
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "Black Suit",
    "desc": "20% offer",
    "Price": 50,
    "price": "$50",
    "category": "men",
    "cloth": "suit",
    "img1": "/static/images/black-suit-front.avif",
    "img2": "/static/images/black-suit-back.jpg",
    "buy": "Add to Cart",
    "qty": 1
  }
]
```

## Data Fields
- `Price`: Numerical price for logic/sorting.
- `price`: Formatted string price for display.
- `category`: `men` or `women`.
- `cloth`: `suit`, `gown`, `watch`, `bag`.
