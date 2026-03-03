# Database Schema

Mackkas uses an SQLite database (`mackkas.db`) managed via SQLAlchemy ORM.

## Entity Relationship Diagram
```mermaid
erDiagram
    USER ||--o{ CART_ITEM : owns
    PRODUCT ||--o{ CART_ITEM : contains
    USER {
        int id PK
        string username
        string email
        string password_hash
    }
    PRODUCT {
        int id PK
        string name
        string description
        float price
        string category
        string cloth_type
        string img1
        string img2
    }
    CART_ITEM {
        int id PK
        int user_id FK
        int product_id FK
        int quantity
    }
```

## Table Definitions

### 1. `user`
| Column | Type | Constraints |
|---|---|---|
| `id` | `Integer` | `Primary Key` |
| `username` | `String(80)` | `Unique`, `Not Null` |
| `email` | `String(120)` | `Unique`, `Not Null` |
| `password_hash` | `String(128)` | `Not Null` |

### 2. `product`
| Column | Type | Constraints |
|---|---|---|
| `id` | `Integer` | `Primary Key` |
| `name` | `String(100)` | `Not Null` |
| `description` | `String(200)` | |
| `price` | `Float` | `Not Null` |
| `category` | `String(50)` | |
| `cloth_type` | `String(50)` | |
| `img1` | `String(200)` | |
| `img2` | `String(200)` | |

### 3. `cart_item`
| Column | Type | Constraints |
|---|---|---|
| `id` | `Integer` | `Primary Key` |
| `user_id` | `Integer` | `Foreign Key (user.id)` |
| `product_id` | `Integer` | `Foreign Key (product.id)` |
| `quantity` | `Integer` | `Default: 1` |
