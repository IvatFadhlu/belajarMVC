//============================================================yang atas udah berhasil sebenernya

const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");

class LoginController {
  static showLoginForm(req, res) {
    // Render halaman login
    res.render("login", { message: "", messageClass: "" });
  }

  static async processLogin(req, res) {
    try {
      // Ambil data dari form login
      const { email, password } = req.body;

      // Cek apakah email dan password sesuai dengan data yang tersimpan di database
      const user = await UserModel.getUserByEmail(email);

      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          // const hashedPassword = await bcrypt.compare(password, user.password);
          console.log(user.password);
          console.log("success");
          // Jika email dan password cocok, set cookie authToken dengan nilai yang unik
          const authToken = generateAuthToken();

          // Simpan authToken sebagai cookie
          res.cookie("authToken", authToken);
          console.log(authToken);
          res.redirect("/protected");
        } else {
          // Jika email dan password tidak cocok, tampilkan pesan kesalahan
          res.render("login", {
            message: "Invalid email or password",
            messageClass: "alert-danger",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.render("login", {
        message: "An error occurred",
        messageClass: "alert-danger",
      });
    }
  }

  static authTokenFromCookies(req, res, next) {
    // Ambil authToken dari cookie
    const authToken = req.cookies.authToken;

    // Set authToken ke dalam request
    req.authToken = authToken;

    next();
  }
}

// Fungsi untuk menghasilkan authToken unik
function generateAuthToken() {
  const authTokenLength = 32;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let authToken = "";

  for (let i = 0; i < authTokenLength; i++) {
    authToken += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return authToken;
}

module.exports = { LoginController };

//=======================================================
