from server import create_app
import os
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == '__main__':
    app.run(debug=(os.environ.get('FLASK_ENV') != 'production'))
