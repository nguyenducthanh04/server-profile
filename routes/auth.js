var express = require("express");
var router = express.Router();
const passport = require("passport");
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
//     successRedirect: "http://127.0.0.1:3001/user",
//   })
// );
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    // Lưu thông tin người dùng vào session hoặc gửi về cho ReactJS qua API
    const userData = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,

      // Các thông tin khác nếu cần
    };

    // Gửi thông tin người dùng về cho ReactJS qua redirect hoặc API
    res.redirect(
      `http://127.0.0.1:3001/user?${new URLSearchParams(userData).toString()}`
    );
  }
);
router.get("/users", (req, res) => {
  const response = req.user;
  console.log(response);
  res.json(response);
});
router.get("/login/url", (req, res) => {
  const redirectUrl = "http://127.0.0.1:3000/auth/google/redirect";
  res.json({ redirectUrl });
});
router.post("/logout", AuthController.logout);
module.exports = router;
