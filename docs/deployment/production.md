# Deployment Documentation

Guidelines for deploying Mackkas to various environments.

## Production
1. **Infrastructure:** Recommended to use a VPS (e.g., DigitalOcean, AWS EC2) with Ubuntu 22.04.
2. **Web Server:** Use `Gunicorn` as the application server and `Nginx` as a reverse proxy.
3. **Configuration:**
   - Set `DEBUG=False` in `app.py`.
   - Use a strong, environment-variable-based `SECRET_KEY`.
4. **Command:**
   ```bash
   gunicorn -w 4 -b 127.0.0.1:8000 app:app
   ```

## Staging
- The staging environment should mirror production as closely as possible.
- Use a separate database file (`mackkas-staging.db`).
- Access restricted to known IP addresses.

## Docker Setup
A `Dockerfile` is provided for containerized deployment:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
```

## CI/CD Pipeline
- **GitHub Actions:** Logic for automated testing on push and deployment on merge to `main`.
- **Steps:**
  1. Linting with `flake8`.
  2. Testing with `pytest`.
  3. Build Docker Image.
  4. Deploy to Server via SSH.
