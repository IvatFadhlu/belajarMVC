class LogoutController {
  static showHomePage(req, res) {
    // Hapus cookie authToken
    res.clearCookie("authToken");

    // Redirect ke halaman utama atau halaman login
    res.redirect("/");
  }
}

module.exports = { LogoutController };
