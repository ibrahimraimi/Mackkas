# Installation

This guide will walk you through the process of setting up the Mackkas platform on your local machine.

## 1. Clone the Repository
```bash
git clone https://github.com/your-username/Mackkas.git
cd Mackkas
```

## 2. Set Up a Virtual Environment
It is highly recommended to use a virtual environment to manage dependencies.
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

## 3. Install Dependencies
```bash
pip install -r requirements.txt
```

## 4. Initialize the Database
Run the seeding script to create the SQLite database and populate it with initial product data.
```bash
python3 seed.py
```

## 5. Start the Development Server
```bash
python3 app.py
```
The application will be accessible at `http://127.0.0.1:5000`.
