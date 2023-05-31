// class LoginController {
//   static showLoginForm(req, res) {
//     res.render("login"); // Menggunakan view "login" untuk halaman login
//   }

// const e = require("express");

//   static processLogin(req, res) {
//     // Proses logika login
//     const { username, password } = req.body;

//     // Contoh sederhana untuk memeriksa username dan password
//     if (username === "admin" && password === "password") {
//       res.send("Login berhasil!");
//     } else {
//       res.send("Login gagal! Silakan coba lagi.");
//     }
//   }
// }

// module.exports = { LoginController };

// ============== trial auth token from stackabuse :

// class LoginController {
//   static showLoginForm(req, res) {
//     res.render("login"); // Menggunakan view "login" untuk halaman login
//   }

//   static async processLogin(req, res) {
//     const crypto = require("crypto");

//     const authTokens = {};

//     const getHashedPassword = (password) => {
//       const sha256 = crypto.createHash("sha256");
//       const hash = sha256.update(password).digest("base64");
//       return hash;
//     };

//     const users = [
//       // This user is added to the array to avoid creating a new user on each restart
//       {
//         firstName: "John",
//         lastName: "Doe",
//         email: "johndoe@email.com",
//         // This is the SHA256 hash for value of `password`
//         password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
//       },
//     ];

//     try {
//       const generateAuthToken = () => {
//         return crypto.randomBytes(30).toString("hex");
//       };
//       const authTokens = {};
//       const { email, password } = req.body;
//       const hashedPassword = getHashedPassword(password);
//       const user = users.find((u) => {
//         return u.email === email && hashedPassword === u.password;
//       });

//       if (user) {
//         const authToken = generateAuthToken();

//         // Store authentication token
//         authTokens[authToken] = user;

//         // Setting the auth token in cookies
//         res.cookie("AuthToken", authToken);

//         // Redirect user to the protected page
//         res.redirect("/protected");
//       } else {
//         res.render("login", {
//           message: "Invalid username or password",
//           messageClass: "alert-danger",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   static async authTokenFromCookies(req, res, next) {
//     try {
//       const authTokens = {};
//       const authToken = req.cookies["AuthToken"];
//       req.user = authTokens[authToken];
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = { LoginController };

//==========stack abuse and ai rekomen

const { UserModel } = require("../models/UserModel");

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
      const user = await UserModel.getUserByEmail(email, password);

      if (user) {
        // Jika email dan password cocok, set cookie authToken dengan nilai yang unik
        const authToken = generateAuthToken();

        // Simpan authToken sebagai cookie
        res.cookie("authToken", authToken);

        // Redirect ke halaman protected setelah berhasil login
        res.redirect("/protected");
      } else {
        // Jika email dan password tidak cocok, tampilkan pesan kesalahan
        res.render("login", {
          message: "Invalid email or password",
          messageClass: "alert-danger",
        });
      }
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
