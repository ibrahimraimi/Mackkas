# Product Catalog Feature

The product catalog is the heart of the Mackkas shopping experience.

## Features
- **Dynamic Loading:** Products are fetched from the database via an API.
- **Filtering:** Filter products by category (Men/Women) or type (Suits/Gowns/Watches/Bags).
- **Price Range Search:** Interactive slider to filter products by price.
- **Live Search:** Search products by name using the search bar.
- **Visual Micro-interactions:** Image hover effects and star ratings.

## Technical Details
- **API Endpoint:** `GET /api/products`
- **Logic:** `product-catalog.js` handles all filtering and rendering.
- **Performance:** Optimized image loading through explicit dimensions and modern formats.

## Product Metadata
Each product includes:
- Name, Description, Price.
- Two image paths for the hover-flip effect.
- Category and Cloth Type for filtering.
