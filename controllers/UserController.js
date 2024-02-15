const model = require("../models/index");
const Files = model.files;

class Users {
  async User(req, res) {
    const user = req.user;
    console.log(user);
    res.json(user);
  }
}
module.exports = new Users();
