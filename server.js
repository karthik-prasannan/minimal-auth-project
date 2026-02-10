const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Hardcoded user
const USER = {
  email: "test@example.com",
  password: "123456",
};

// Login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Login handler
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/?error=All fields are required");
  }

  if (email === USER.email && password === USER.password) {
    req.session.user = email;
    return res.redirect("/dashboard");
  }

  return res.redirect("/?error=Invalid credentials");
});

// Protected dashboard
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  res.send(`
    <h2>Welcome to Dashboard</h2>
    <p>Logged in as: ${req.session.user}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
