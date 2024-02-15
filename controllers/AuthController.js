module.exports = {
  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      //   res.clearCookie("loginToken");
      res.json({ message: "Logged out successfully" });
    });
  },
};
