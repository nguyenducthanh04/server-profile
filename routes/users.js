var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    data: {
      name: "Thanh",
      age: 20,
    },
  });
});
router.get("/display", UserController.User);

module.exports = router;
