# Debugging Tips

Effective techniques for identifying and fixing issues in Mackkas.

## Backend Debugging (Python/Flask)
1. **Interactive Debugger:** Flask's debug mode is enabled by default in `app.py`. When an error occurs, you can use the interactive debugger in the browser.
2. **Print Debugging:** Use `print()` to inspect variables in the terminal where the server is running.
3. **Logging:** Check the terminal output for stack traces.
4. **SQLAlchemy Echo:** To see the underlying SQL queries, temporarily set:
   ```python
   app.config['SQLALCHEMY_ECHO'] = True
   ```

## Frontend Debugging (JavaScript/Browser)
1. **Console:** Use `console.log()` to inspect data and `console.error()` for error states.
2. **Sources Tab:** Use browser developer tools to set breakpoints and step through `product-catalog.js`.
3. **Network Tab:** Verify that API calls to `/api/products` and `/api/cart` are returning the expected JSON data.
4. **Application Tab:** Inspect `sessionStorage` for `currentUser` data.

## Common Fixes
- **Static files not updating:** Force a hard refresh (Ctrl+F5 or Cmd+Shift+R) to bypass the browser cache.
- **Database locked:** Ensure no other process (like DB Browser for SQLite) has an open transaction on `mackkas.db`.
