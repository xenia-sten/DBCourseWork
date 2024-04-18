module.exports = {
  connectionString: process.env.DATABASE_URL,
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "calendar_db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};