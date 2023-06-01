// const postgresqlDb = require("./init");

// class UserModel {
//   static async createUser(firstName, lastName, email, password) {
//     try {
//       const query = `
//         INSERT INTO regist_data ("firstName", "lastName", email, password)
//         VALUES ($1, $2, $3, $4)
//         RETURNING id, "firstName", "lastName", email;
//       `;
//       const values = [firstName, lastName, email, password];

//       const result = await postgresqlDb.Client.query(query, values);
//       return result.rows[0];
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async getUserByEmail(email, password) {
//     try {
//       const query = `
//       SELECT *
//       FROM regist_data
//       WHERE email = $1 AND password = $2
//       `;
//       const values = [email, password];

//       const result = await postgresqlDb.Client.query(query, values);
//       return result.rows[0];
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = { UserModel };

//====================================================================

const bcrypt = require("bcrypt");
const postgresqlDb = require("./init");

class UserModel {
  static async createUser(firstName, lastName, email, password) {
    try {
      const query = `
        INSERT INTO regist_data ("firstName", "lastName", email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, "firstName", "lastName", email;
      `;
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing

      const values = [firstName, lastName, email, hashedPassword];

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

  static async comparePassword(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserModel };
