class ProtectedController {
  static showProtectedPage(req, res) {
    try {
      if (req.user) {
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
