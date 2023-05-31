// class RegisterController {
//   static showRegisterForm(req, res) {
//     res.render("register");
//   }
//   static async postDataRegister(req, res) {
//     try {
//       //===declare & inisiasi
//       const crypto = require("crypto");
//       const { path } = require("express/lib/application");

//       const getHashedPassword = (password) => {
//         const sha256 = crypto.createHash("sha256");
//         const hash = sha256.update(password).digest("base64");
//         return hash;
//       };

//       const users = [
//         // This user is added to the array to avoid creating a new user on each restart
//         {
//           firstName: "John",
//           lastName: "Doe",
//           email: "johndoe@email.com",
//           // This is the SHA256 hash for value of `password`
//           password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
//         },
//       ];

//       //=====inisiasi lanjutan app.post register
//       const { email, firstName, lastName, password, confirmPassword } =
//         req.body;

//       // Check if the password and confirm password fields match
//       if (password === confirmPassword) {
//         // Check if user with the same email is also registered
//         if (users.find((user) => user.email === email)) {
//           res.render("register", {
//             message: "User already registered.",
//             messageClass: "alert-danger",
//           });

//           return;
//         }

//         const hashedPassword = getHashedPassword(password);

//         // Store user into the database if you are using one
//         users.push({
//           firstName,
//           lastName,
//           email,
//           password: hashedPassword,
//         });

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
//===============================================================================================================================

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
