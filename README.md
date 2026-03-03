# Mackkas E-commerce Platform

Mackkas is a modernized, full-stack e-commerce platform built with Flask, SQLite, and Vanilla JavaScript. It provides a secure, efficient, and visually stunning shopping experience.

---

#Setup Guide

Follow these steps to get your own instance of Mackkas running locally.

### 1. Prerequisites
Ensure you have **Python 3.8+** installed. Check your version with:
```bash
python3 --version
```

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/Mackkas.git
cd Mackkas
```

### 3. Install Dependencies
It is recommended to use a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install flask flask-sqlalchemy werkzeug
```

### 4. Initialize the Database
Run the seed script to create the database schema and populate it with initial products:
```bash
python3 seed.py
```

### 5. Run the Application
Start the development server:
```bash
python3 app.py
```
Open your browser to `http://127.0.0.1:5000` to see the site in action!

---

## Key Features
- **Secure Authentication:** Passwords hashed using `scrypt`.
- **Dynamic Catalog:** Real-time filtering and search via backend API.
- **Persistent Cart:** Your cart follows you across sessions.
- **Modern UI:** Clean, responsive design with smooth micro-animations.

## Documentation
Detailed documentation is available in the [`docs/`](docs/README.md) directory:
- [Architecture Overview](docs/architecture/overview.md)
- [API Reference](docs/api/authentication.md)
- [Development Guide](docs/development/coding-standards.md)
- [Deployment Instructions](docs/deployment/production.md)

## Tech Stack
- **Backend:** Python + Flask + SQLAlchemy
- **Frontend:** HTML5 + CSS3 + Vanilla JS
- **Database:** SQLite
