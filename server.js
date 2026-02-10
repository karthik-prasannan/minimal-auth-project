const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from public folder
app.use(express.static("public"));

// Session setup
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

// Show login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Handle login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/?error=All fields are required");
  }

  if (email === USER.email && password === USER.password) {
    req.session.user = email;
    return res.redirect("/dashboard");
  } else {
    return res.redirect("/?error=Invalid credentials");
  }
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


// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
