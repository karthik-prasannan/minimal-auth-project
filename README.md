# Minimal Authentication Project

This project extends a static website by adding a minimal backend layer that supports user authentication and protected access.

The goal is simplicity, correctness, and clarity — not a full-stack application.

---

## 🔗 Live URL

Backend (Render):  
https://minimal-auth-project.onrender.com

GitHub Repository:  
https://github.com/karthik-prasannan/minimal-auth-project

---

## 🛠 Tech Stack

- Node.js
- Express.js
- express-session (session-based authentication)
- HTML / CSS (no frameworks)
- Render (backend deployment)

---

## 🔐 Authentication Flow

1. User opens the login page.
2. User enters email and password.
3. Login form submits data to the backend (`POST /login`).
4. Backend checks credentials against a hardcoded user.
5. If credentials are valid:
   - A session is created using `express-session`.
   - User is redirected to the protected dashboard.
6. If credentials are invalid:
   - User is redirected back to login with an error message.

---

## 🧠 How Authentication State Is Stored

- Authentication state is stored using server-side sessions.
- `express-session` creates a session ID.
- The session ID is stored in a browser cookie.
- Session data (logged-in user email) is stored on the server.

Example:

```js
req.session.user = email;
```
