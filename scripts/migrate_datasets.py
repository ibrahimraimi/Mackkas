import os
import shutil
import random
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base

# Load environment variables
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL")
TURSO_TOKEN = os.getenv("TURSO_TOKEN")
if not DATABASE_URL or not TURSO_TOKEN:
    raise ValueError("DATABASE_URL or TURSO_TOKEN not found in .env")

# Construct SQLAlchemy URL for Turso
# Verified format: sqlite+libsql://?url=https://hostname&authToken=token
hostname = DATABASE_URL.replace("libsql://", "").replace("https://", "")
connection_url = f"sqlite+libsql://?url=https://{hostname}&authToken={TURSO_TOKEN}"

engine = create_engine(connection_url)
Base = declarative_base()

class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(200))
    price = Column(Float, nullable=False)
    category = Column(String(50))
    cloth_type = Column(String(50))
    img1 = Column(String(200))
    img2 = Column(String(200))

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Directories
DATASET_DIR = "static/datasets"
IMAGES_DIR = "static/images"

# Naming mapping & price generation
CATEGORY_MAPPING = {
    "men-formal-shirts": {"category": "men", "cloth": "shirt", "prefix": "formal-shirt"},
    "men-polo": {"category": "men", "cloth": "polo", "prefix": "polo-shirt"},
    "men-shoes": {"category": "men", "cloth": "shoe", "prefix": "essential-shoe"},
    "men-suits": {"category": "men", "cloth": "suit", "prefix": "tailored-suit"},
    "women-bags": {"category": "women", "cloth": "bag", "prefix": "designer-bag"},
    "women-dresses": {"category": "women", "cloth": "dress", "prefix": "elegant-dress"},
    "women-heels": {"category": "women", "cloth": "heel", "prefix": "stylish-heel"}
}

def migrate():
    products = []
    
    for subdir in os.listdir(DATASET_DIR):
        subdir_path = os.path.join(DATASET_DIR, subdir)
        if not os.path.isdir(subdir_path) or subdir not in CATEGORY_MAPPING:
            continue
            
        mapping = CATEGORY_MAPPING[subdir]
        files = [f for f in os.listdir(subdir_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.avif'))]
        
        # We group by 2 to have img1 and img2 if possible
        for i in range(0, len(files), 2):
            img1_old = files[i]
            img2_old = files[i+1] if i+1 < len(files) else None
            
            ext1 = os.path.splitext(img1_old)[1]
            ext2 = os.path.splitext(img2_old)[1] if img2_old else None
            
            # Generate descriptive names
            # Using category and index for the name
            item_index = (i // 2) + 1
            name = f"{mapping['category'].capitalize()} {mapping['cloth'].capitalize()} {item_index}"
            img1_new = f"{mapping['prefix']}-{item_index}-primary{ext1}"
            img2_new = f"{mapping['prefix']}-{item_index}-secondary{ext2}" if img2_old else None
            
            # Move files
            shutil.copy2(os.path.join(subdir_path, img1_old), os.path.join(IMAGES_DIR, img1_new))
            if img2_old:
                shutil.copy2(os.path.join(subdir_path, img2_old), os.path.join(IMAGES_DIR, img2_new))
            
            # Create product object
            product = Product(
                name=name,
                description=f"Premium {mapping['cloth']} from our {mapping['category']}'s collection.",
                price=float(random.randint(45, 1200)),
                category=mapping['category'],
                cloth_type=mapping['cloth'],
                img1=img1_new,
                img2=img2_new if img2_new else ""
            )
            products.append(product)
            print(f"Prepared: {name} ({img1_new})")

    # Seed Turso
    print(f"Seeding {len(products)} products to Turso...")
    session.add_all(products)
    session.commit()
    print("Migration and seeding complete!")

if __name__ == "__main__":
    migrate()
