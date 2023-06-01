const { UserModel } = require("../models/UserModel");

class RegisterController {
  static showRegisterForm(_req, res) {
    res.render("register");
  }

  static async postDataRegister(req, res) {
    try {
      const { email, firstName, lastName, password, confirmPassword } =
        req.body;

      // Check if the password and confirm password fields match
      if (password === confirmPassword) {
        // Check if user with the same email is already registered
        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
          res.render("register", {
            message: "User already registered.",
            messageClass: "alert-danger",
          });
          return;
        }

        // Create a new user in the database
        await UserModel.createUser(firstName, lastName, email, password);

        res.render("login", {
          message: "Registration Complete. Please login to continue.",
          messageClass: "alert-success",
        });
      } else {
        res.render("register", {
          message: "Password does not match.",
          messageClass: "alert-danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { RegisterController };
//========================================================================
//====================================================== daftar hashing below
// const bcrypt = require("bcrypt");
// // ...
// const { UserModel } = require("../models/UserModel");

// class RegisterController {
//   static showRegisterForm(_req, res) {
//     res.render("register");
//   }

//   static async postDataRegister(req, res) {
//     try {
//       const { email, firstName, lastName, password, confirmPassword } =
//         req.body;

//       // Check if the password and confirm password fields match
//       if (password === confirmPassword) {
//         // Check if user with the same email is already registered
//         const existingUser = await UserModel.getUserByEmail(email);
//         if (existingUser) {
//           res.render("register", {
//             message: "User already registered.",
//             messageClass: "alert-danger",
//           });
//           return;
//         }

//         // Hash the password
//         const saltRounds = 10; // Number of salt rounds for bcrypt
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // Create a new user in the database with the hashed password
//         await UserModel.createUser(
//           firstName,
//           lastName,
//           email,
//           hashedPassword // Store the hashed password in the database
//         );

//         res.render("login", {
//           message: "Registration Complete. Please login to continue.",
//           messageClass: "alert-success",
//         });
//       } else {
//         res.render("register", {
//           message: "Password does not match.",
//           messageClass: "alert-danger",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = { RegisterController };
