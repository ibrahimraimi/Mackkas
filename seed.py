from app import app, db, Product

products_data = [
    {
        "category": "men",
        "cloth": "suit",
        "img1": "black-suit-front.avif",
        "img2": "black-suit-back.jpg",
        "name": "Black Suit",
        "desc": "20% offer",
        "Price": 50
    },
    {
        "category": "women",
        "cloth": "bag",
        "img1": "leather-handbag-brown.jpg",
        "img2": "luxury-handbag-black.jpg",
        "name": "Hand Bag",
        "desc": "20% offer",
        "Price": 600
    },
    {
        "category": "women",
        "cloth": "gown",
        "img1": "red-evening-gown.jpg",
        "img2": "white-bridal-gown.jpg",
        "name": "Slit Cut Gown",
        "desc": "30% offer",
        "Price": 120
    },
    {
        "category": "men",
        "cloth": "suit",
        "img1": "classic-navy-suit.jpg",
        "img2": "navy-blue-suit.jpg",
        "name": "Blue Suit",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "men",
        "cloth": "watch",
        "img1": "minimal-black-watch.jpg",
        "img2": "premium-black-watch.jpg",
        "name": "Black watch",
        "desc": "70% offer",
        "Price": 520
    },
    {
        "category": "women",
        "cloth": "gown",
        "img1": "pink-party-gown.jpg",
        "img2": "dark-blue-gown.jpg",
        "name": "Star Light Gown",
        "desc": "50% offer",
        "Price": 620
    },
    {
        "category": "men",
        "cloth": "suit",
        "img1": "light-brown-suit.jpg",
        "img2": "dark-brown-suit.jpeg",
        "name": "Brown Suit",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "men",
        "cloth": "watch",
        "img1": "classic-gold-watch.jpg",
        "img2": "luxury-gold-watch.jpg",
        "name": "Gold watch",
        "desc": "60% offer",
        "Price": 420
    },
    {
        "category": "men",
        "cloth": "watch",
        "img1": "gold-black-watch.jpg",
        "img2": "gold-black-watch-alt.jpg",
        "name": "Gold-Black Watch",
        "desc": "60% offer",
        "Price": 820
    },
    {
        "category": "men",
        "cloth": "suit",
        "img1": "formal-brown-suit.jpg",
        "img2": "vintage-brown-suit.jpg",
        "name": "Brown Suit",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "women",
        "cloth": "gown",
        "img1": "dark-brown-gown.jpg",
        "img2": "light-brown-gown.jpg",
        "name": "Brown Gown",
        "desc": "30% offer",
        "Price": 670
    },
    {
        "category": "men",
        "cloth": "suit",
        "img1": "blue-suit-business.jpeg",
        "img2": "blue-suit-elegant.jpg",
        "name": "Dark Blue Suit",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "men",
        "cloth": "shoe",
        "img1": "classic-black-shoes.jpg",
        "img2": "casual-leather-shoes.jpeg",
        "name": "Black Shoe",
        "desc": "30% offer",
        "Price": 870
    },
    {
        "category": "men",
        "cloth": "watch",
        "img1": "black-leather-watch.jpg",
        "img2": "brown-leather-watch.jpg",
        "name": "Leather Watches",
        "desc": "30% offer",
        "Price": 1950
    },
    {
        "category": "men",
        "cloth": "watch",
        "img1": "digital-sport-watch.jpg",
        "img2": "digital-smart-watch.jpg",
        "name": "Digital Watch",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "women",
        "cloth": "gown",
        "img1": "green-short-gown.jpg",
        "img2": "pink-summer-gown.jpg",
        "name": "Short Gown",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "women",
        "cloth": "outfit",
        "img1": "pumpkin-themed-outfit.jpg",
        "img2": "",
        "name": "Pumpkin Outfit",
        "desc": "60% offer",
        "Price": 750
    },
    {
        "category": "women",
        "cloth": "gown",
        "img1": "pink-gown-detailed.jpg",
        "img2": "pink-gown-alt.webp",
        "name": "Pink Gown",
        "desc": "30% offer",
        "Price": 60
    },
    {
        "category": "men",
        "cloth": "trouser",
        "img1": "dark-formal-trousers.jpg",
        "img2": "",
        "name": "Dark Trouser",
        "desc": "0% offer",
        "Price": 30
    },
    {
        "category": "women",
        "cloth": "bag",
        "img1": "mini-shoulder-bag.jpg",
        "img2": "mini-leather-bag.jpg",
        "name": "Mini Bag",
        "desc": "30% offer",
        "Price": 20
    }
]

def seed_database():
    with app.app_context():
        db.create_all()
        if Product.query.count() == 0:
            for p in products_data:
                new_product = Product(
                    name=p["name"],
                    description=p["desc"],
                    price=float(p["Price"]),
                    category=p["category"],
                    cloth_type=p["cloth"],
                    img1=p["img1"],
                    img2=p["img2"]
                )
                db.session.add(new_product)
            db.session.commit()
            print("Database seeded!")
        else:
            print("Database already has data.")

if __name__ == "__main__":
    seed_database()
