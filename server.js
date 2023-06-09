const express = require("express");
const { CustomerController } = require("./controllers/CustomerController");
const { LoginController } = require("./controllers/LoginController");
const { LogoutController } = require("./controllers/LogoutController");
const { DaftarController } = require("./controllers/DaftarController");
//====stackabuse
const { RegisterController } = require("./controllers/RegisterController");
const { ProtectedController } = require("./controllers/ProtectedController");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//====stackabuse

const app = express();

//support URL -encode body
app.use(bodyParser.urlencoded({ extended: true }));
//parse cookies from HTTP request
app.use(cookieParser());

app.use(LoginController.authTokenFromCookies);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);

app.set("view engine", "ejs");
app.set("view engine", "hbs");
app.set("views", (__dirname, "views"));
app.use(express.static(__dirname + "/public"));

// Rute untuk home utama
app.get("/", (req, res) => {
  res.render("home");
});

// Rute untuk halaman login
app.get("/login", LoginController.showLoginForm);
app.post("/login", LoginController.processLogin);

// Rute untuk halaman daftar
app.get("/register", RegisterController.showRegisterForm);
app.post("/register", RegisterController.postDataRegister);

app.get("/protected", ProtectedController.showProtectedPage);

app.get("/logout", LogoutController.showHomePage);

// contoh get data dari mas gif
app.get("/daftar", DaftarController.showDaftarForm);
app.post("/daftar", DaftarController.postDataUsers);
app.get("/customer", CustomerController.getAllDataCustomer);

app.listen(process.env.PORT, () => {
  console.log(`Server Running On PORT ${process.env.PORT}`);
});
