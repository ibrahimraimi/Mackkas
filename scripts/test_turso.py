import os
from dotenv import load_dotenv
import libsql_experimental as libsql

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
TURSO_TOKEN = os.getenv("TURSO_TOKEN")
hostname = DATABASE_URL.replace("libsql://", "").replace("https://", "")

# Try 4: SQLAlchemy with libsql dialect (different format)
from sqlalchemy import create_engine, text
print("Testing SQLAlchemy variants...")

variants = [
    f"sqlite+libsql://?url=https://{hostname}&authToken={TURSO_TOKEN}",
    f"sqlite+libsql://{hostname}/?authToken={TURSO_TOKEN}&secure=true",
    f"sqlite+libsql://{hostname}/?authToken={TURSO_TOKEN}"
]

for url in variants:
    print(f"Testing URL: {url.split('?')[0]}?authToken=***")
    try:
        engine = create_engine(url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print(f"Success with {url.split('://')[0]}!")
    except Exception as e:
        print(f"Failed with {url.split('://')[0]}: {e}")
