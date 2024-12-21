const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");
const { isAuthenticated, isVip } = require("../middleware/auth");

router.get("/", async (req, res) => {
  if (req.user) {
    return res.redirect("/user");
  }
  try {
    const result = await pool.query(
      "SELECT messages.*,users.username as author_name from messages join users ON messages.id_author = users.id ORDER BY messages.created_at DESC"
    );
    const messages = result.rows;

    res.render("index", {
      title: "Login",
      user: null,
      messages: messages,
    });
  } catch (error) {
    console.error("Error loading /user ", error);
    res.render("index", {
      title: "Login",
      user: null,
      messages: [], // provide an empty array if there's an error
    });
  }
});
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT messages.*,users.firstname as firstName, users.lastname as lastName from messages join users ON messages.id_author = users.id ORDER BY messages.created_at DESC"
    );
    const messages = result.rows;

    res.render("user", {
      title: "User Page",
      user: req.user,
      messages: messages,
    });
  } catch (error) {
    console.error("Error loading /user ", error);
  }
});
module.exports = router;
