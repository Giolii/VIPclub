const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");
const { isAuthenticated, isVip } = require("../middleware/auth");

router.post("/send", isAuthenticated, async (req, res) => {
  try {
    const idAuthor = req.session.passport.user;
    const { title, content } = req.body;
    await pool.query(
      "INSERT INTO messages (id_author, title, content) VALUES ($1,$2,$3) RETURNING *",
      [idAuthor, title, content]
    );
    res.redirect("/user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/requestVipStatus", isAuthenticated, async (req, res) => {
  try {
    const idAuthor = req.session.passport.user;
    await pool.query("UPDATE users SET isvip = true WHERE id = $1 ", [
      idAuthor,
    ]);
    res.redirect("/user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/requestMembership", isAuthenticated, async (req, res) => {
  try {
    const idAuthor = req.session.passport.user;
    await pool.query("UPDATE users SET ismember = true WHERE id = $1 ", [
      idAuthor,
    ]);
    res.redirect("/user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/deleteMessage", isAuthenticated, async (req, res) => {
  try {
    const msgId = req.body.id;
    await pool.query("DELETE FROM messages  WHERE id = $1 ", [msgId]);
    res.redirect("/user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
