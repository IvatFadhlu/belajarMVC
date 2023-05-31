const postgresqlDb = require("./init");

class CustomerModel {
  static async getDataCustomer() {
    const data = await postgresqlDb.Client.query(`
    SELECT * FROM customer`);

    return data;
  }
}

module.exports = { CustomerModel };
