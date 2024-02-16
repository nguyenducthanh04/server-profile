const model = require("../models/index");
const Files = model.files;

class Users {
  async User(req, res) {
    const name = req.user;
    console.log(name);
    res.json(name);
  }
}
module.exports = new Users();
