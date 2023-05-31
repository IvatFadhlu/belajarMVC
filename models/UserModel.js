const postgresqlDb = require("./init");

class UserModel {
  static async createUser(firstName, lastName, email, password) {
    try {
      const query = `
        INSERT INTO regist_data (firstName, lastName, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, firstName, lastname, email;
      `;
      const values = [firstName, lastName, email, password];

      const result = await postgresqlDb.Client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email, password) {
    try {
      const query = `
        SELECT *
        FROM regist_data
        WHERE email = $1 AND password = $2
      `;
      const values = [email, password];

      const result = await postgresqlDb.Client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserModel };

//==================
// const { postgresqlDb } = require("../models/init");

// class UserModel {
//   static async getUserByEmail(req, res) {
//     try {
//       // ambil data dari models
//       const customerData = await CustomerModel.getDataCustomer();
//       // pilih template html untuk data yang diniatkan
//       // POSITIVE CASE : Data tersimpan
//       if (customerData.rowCount > 0) {
//         res.render("customer", { customer: customerData.rows });
//         // NEGATIVE CASE : Data Kosong
//       } else {
//         res.render("NotFound");
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// }

// module.exports = { UserModel };
