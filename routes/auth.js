const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password do not match");
    }
    return true;
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, firstName, lastName, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "INSERT INTO users (username,firstName,lastName,password) VALUES ($1,$2,$3,$4)",
        [username, firstName, lastName, hashedPassword]
      );
      res.redirect("/");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/user");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
