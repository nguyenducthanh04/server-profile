var express = require("express");
var router = express.Router();
const passport = require("passport");
const isLogin = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  }
  next();
};
/* GET home page. */
router.get("/google/redirect", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
    successRedirect: "http://127.0.0.1:3001/user",
  })
);
router.get("/users", (req, res) => {
  res.json(req.user);
});
router.get("/login/url", (req, res) => {
  const redirectUrl = "http://127.0.0.1:3000/auth/google/redirect";
  res.json({ redirectUrl });
});
module.exports = router;
