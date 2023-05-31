//===================================================================================================
// const { DaftarModel } = require("../models/DaftarFormModel");

// class DaftarController {
//     static showDaftarForm(req, res) {
//     res.render("daftar");
//   }

//   static async postDataUsers(req, res) {
//       try {
//           // Ambil data dari form yang diisi user untuk mendaftar
//       const userData = req.body;
      
//       // Proses penyimpanan data pengguna ke dalam database atau melakukan operasi lain sesuai kebutuhan
//       await DaftarModel.saveUser(userData);
      
//       // Redirect ke halaman sukses pendaftaran atau tampilan lain yang diinginkan
//       res.redirect("/success");
//     } catch (error) {
//         console.log(error);
//         // Tangani kesalahan jika terjadi saat memproses data pendaftaran
//       res.redirect("/error");
//     }
// }
// }

// module.exports = { DaftarController };
//===================================================================================================


const { DaftarModel } = require("../models/DaftarFormModel");

class DaftarController {
    static showDaftarForm(req, res) {
    res.render("daftar");
  }

  static async postDataUsers(req, res) {
      try {
          // Ambil data dari form yang diisi user untuk mendaftar
      const userData = req.body;
      
      // Proses penyimpanan data pengguna ke dalam database atau melakukan operasi lain sesuai kebutuhan
      await DaftarModel.saveUser(userData);
      
      // Redirect ke halaman sukses pendaftaran atau tampilan lain yang diinginkan
      res.redirect("/success");
    } catch (error) {
        console.log(error);
        // Tangani kesalahan jika terjadi saat memproses data pendaftaran
      res.redirect("/error");
    }
}
}

module.exports = { DaftarController };

