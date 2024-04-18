module.exports = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: "postgres",
    password: "postgres",
    database: "calendar_db",
  }
});