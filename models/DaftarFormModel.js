// const postgresqlDb = require("./init");

// class DaftarFormModel {
//   static async insertDataUsers(formData) {
//     try {
//       const { username, password, email } = formData;

//       const query = `
//         INSERT INTO users (username, password, email)
//         VALUES ($1, $2, $3)
//       `;
//       const values = [username, password, email];

//       await postgresqlDb.Client.query(query, values);
//       console.log("Data pengguna berhasil dimasukkan ke dalam basis data");
//     } catch (error) {
//       console.log("Gagal memasukkan data pengguna ke dalam basis data", error);
//       throw error;
//     }
//   }
// }

// module.exports = { DaftarFormModel };

//==========================================================

const postgresqlDb = require("./init");

class DaftarFormModel {
  static async insertDataUsers(formData) {
    try {
      const { username, password, email } = formData;

      const query = `
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
      `;
      const values = [username, password, email];

      await postgresqlDb.Client.query(query, values);
      console.log("Data pengguna berhasil dimasukkan ke dalam basis data");
    } catch (error) {
      console.log("Gagal memasukkan data pengguna ke dalam basis data", error);
      throw error;
    }
  }
}

module.exports = { DaftarFormModel };
