const postgresqlDb = require("./init");

class RegisterModel {
  static async createUser(firstName, lastName, email, password) {
    try {
      const query = `
        INSERT INTO regist_data (firstName, lastName, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, firstName, lastName, email
      `;
      const values = [firstName, lastName, email, password];

      const result = await postgresqlDb.Client.query(query, values);
      const newUser = result.rows[0];

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = `
        SELECT * FROM regist_data
        WHERE email = $1
      `;
      const values = [email];

      const result = await postgresqlDb.Client.query(query, values);
      const user = result.rows[0];

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { RegisterModel };
