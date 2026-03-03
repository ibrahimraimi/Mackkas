# Troubleshooting

Common issues and how to resolve them.

## 1. Database Connection Errors
**Issue:** `sqlite3.OperationalError: no such table`
**Solution:** Ensure you have run the `seed.py` script to initialize the database:
```bash
python3 seed.py
```

## 2. Port 5000 Already in Use
**Issue:** `OSError: [Errno 98] Address already in use`
**Solution:** Another process is using port 5000 (often AirPlay on macOS). Either stop that process or change the port in `app.py`:
```python
app.run(debug=True, port=5001)
```

## 3. Static Assets Not Loading
**Issue:** CSS or images are not appearing correctly.
**Solution:** Check the browser console for 404 errors. Ensure all static assets are located in the `static/` directory and referenced using `url_for('static', filename='...')`.

## 4. Authentication Failures
**Issue:** Correct credentials are being rejected.
**Solution:** If you recently changed the `SECRET_KEY` or updated the User model, your session might be invalid. Clear your browser cookies and try again.
