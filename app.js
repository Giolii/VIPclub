const express = require("express");
const session = require("express-session");
const path = require("node:path");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();
const { pool } = require("./config/database");
require("./config/passport");

const app = express();

// ERROR HANDLING
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// Set EJS as a render engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public")); /* For CSS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 1000,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something broke on the server!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
