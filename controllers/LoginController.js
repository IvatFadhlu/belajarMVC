//==========stack abuse and ai rekomen

// const { UserModel } = require("../models/UserModel");

// class LoginController {
//   static showLoginForm(req, res) {
//     // Render halaman login
//     res.render("login", { message: "", messageClass: "" });
//   }

//   static async processLogin(req, res) {
//     try {
//       // Ambil data dari form login
//       const { email, password } = req.body;

//       // Cek apakah email dan password sesuai dengan data yang tersimpan di database
//       const user = await UserModel.getUserByEmail(email, password);

//       if (user) {
//         // Jika email dan password cocok, set cookie authToken dengan nilai yang unik
//         const authToken = generateAuthToken();

//         // Simpan authToken sebagai cookie
//         res.cookie("authToken", authToken);

//         // Redirect ke halaman protected setelah berhasil login
//         res.redirect("/protected");
//       } else {
//         // Jika email dan password tidak cocok, tampilkan pesan kesalahan
//         res.render("login", {
//           message: "Invalid email or password",
//           messageClass: "alert-danger",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.render("login", {
//         message: "An error occurred",
//         messageClass: "alert-danger",
//       });
//     }
//   }

//   static authTokenFromCookies(req, res, next) {
//     // Ambil authToken dari cookie
//     const authToken = req.cookies.authToken;

//     // Set authToken ke dalam request
//     req.authToken = authToken;

//     next();
//   }
// }

// // Fungsi untuk menghasilkan authToken unik
// function generateAuthToken() {
//   const authTokenLength = 32;
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let authToken = "";

//   for (let i = 0; i < authTokenLength; i++) {
//     authToken += characters.charAt(
//       Math.floor(Math.random() * characters.length)
//     );
//   }

//   return authToken;
// }

// module.exports = { LoginController };

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

      if (user) {
        let hashedPassword = await bcrypt.hash(password, 10);
        // const hashedPassword = await bcrypt.compare(password, user.password);
        console.log(user.password);
        console.log(hashedPassword);
        // if (valid) {
        //   res.redirect("/protected");
        // }
        if (hashedPassword === user.password) {
          // Jika email dan password cocok, set cookie authToken dengan nilai yang unik
          // const authToken = generateAuthToken();

          // // Simpan authToken sebagai cookie
          // res.cookie("authToken", authToken);

          // Redirect ke halaman protected setelah berhasil login
          console.log("success");
          res.redirect("/protected");
        }
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

//=======================================================

// const { hash, hashSync } = require("bcrypt");
// const { UserModel } = require("../models/UserModel");
// const bcrypt = require("bcrypt");

// class LoginController {
//   static showLoginForm(req, res) {
//     // Render halaman login
//     res.render("login", { message: "", messageClass: "" });
//   }

//   static async processLogin(req, res) {
//     try {
//       // Ambil data dari form login
//       const { email, password } = req.body;

//       // Cek apakah email ada dalam database
//       const user = await UserModel.getUserByEmail(email);

//       if (user) {
//         // Membandingkan password yang dimasukkan dengan password yang telah dienkripsi
//         const match = await bcrypt.compare(password, user.password);
//         // const match = await UserModel.comparePassword(password, hashedPassword);

//         if (match) {
//           // Jika email dan password cocok, set cookie authToken dengan nilai yang unik
//           const authToken = generateAuthToken(email, password);

//           // Simpan authToken sebagai cookie
//           res.cookie("authToken", authToken);

//           // Redirect ke halaman protected setelah berhasil login
//           res.redirect("/protected");
//         } else {
//           // Jika password tidak cocok, tampilkan pesan kesalahan
//           res.render("login", {
//             message: "Invalid email or password",
//             messageClass: "alert-danger",
//           });
//         }
//       } else {
//         // Jika email tidak ditemukan, tampilkan pesan kesalahan
//         res.render("login", {
//           message: "Invalid email or password",
//           messageClass: "alert-danger",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.render("login", {
//         message: "An error occurred",
//         messageClass: "alert-danger",
//       });
//     }
//   }

//   static authTokenFromCookies(req, res, next) {
//     // Ambil authToken dari cookie
//     const authToken = req.cookies.authToken;

//     // Set authToken ke dalam request
//     req.authToken = authToken;

//     next();
//   }
// }

// // Fungsi untuk menghasilkan authToken unik
// function generateAuthToken() {
//   const authTokenLength = 32;
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let authToken = "";

//   for (let i = 0; i < authTokenLength; i++) {
//     authToken += characters.charAt(
//       Math.floor(Math.random() * characters.length)
//     );
//   }

//   return authToken;
// }

// module.exports = { LoginController };
