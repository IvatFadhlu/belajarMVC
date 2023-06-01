const { UserModel } = require("../models/UserModel");

class ProtectedController {
  static showProtectedPage(req, res) {
    try {
      if (UserModel.getUserByEmail) {
        res.render("protected");
      } else {
        res.render("login", {
          message: "Please login to continue",
          messageClass: "alert-danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { ProtectedController };
