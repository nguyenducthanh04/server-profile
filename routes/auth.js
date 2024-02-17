var express = require("express");
var router = express.Router();
const passport = require("passport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const isLogin = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.redirect("/");
  }
  next();
};
const AuthController = require("../controllers/AuthController");
/* GET home page. */
router.get("/google/redirect", passport.authenticate("google"));
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/auth/login",
//     failureMessage: true,
//     successRedirect: "http://127.0.0.1:3001/profile",
//   }),
//   (req, res) => {
//     const userData = {
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email,
//     };
//     res.json(userData);
//   }
// );
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    const userData = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };
    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign(userData, secretKey, { expiresIn: "1h" });
    const queryParams = new URLSearchParams({
      token: token,
      ...userData,
    }).toString();
    console.log(req.user);

    res.redirect(`http://127.0.0.1:3001/profile?${queryParams}`);
    // res.redirect("/users/display");
  }
);

router.get("/users", (req, res) => {
  const response = req.user;
  console.log(response);
  res.json({
    status: "success",
    data: response,
  });
});
router.get("/login/url", (req, res) => {
  const redirectUrl = "http://127.0.0.1:3000/auth/google/redirect";
  res.json({ redirectUrl });
});
router.post("/logout", AuthController.logout);
module.exports = router;
