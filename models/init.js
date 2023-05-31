const { Client } = require("pg");

class PostgresqlDb {
  constructor() {
    this.Client = null;
    this.#run();
  }

  #run = async () => {
    const client = new Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_USER,
      user: process.env.PG_NAME,
    });

    try {
      await client.connect();
      console.log("Connect to postgresql db");
      this.Client = client;
    } catch (error) {
      console.log(error);
    }
  };
}

const postgresqlDb = new PostgresqlDb();
module.exports = postgresqlDb;
