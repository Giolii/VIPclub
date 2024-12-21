const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { pool } = require("./database");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (result.rows.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
// ----------- FIX QUERY FOR NEW DB

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      "SELECT id,username,firstname,lastname,isVip,ismember FROM users WHERE id = $1",
      [id]
    );
    done(null, result.rows[0]);
  } catch (error) {
    done(err);
  }
});
