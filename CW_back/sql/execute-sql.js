require("dotenv").config();
const pg = require("pg");
// const { client } = require("../config/knex.config");
// const fs = require("fs");
// const sql = fs.readFileSync('demoData.sql').toString();

// const config = {
//   user: "postgres",
//   database: "calendar_db.calendar",
//   password: "postgres",
//   port: process.env.DB_PORT
//   // min: 0,
//   // max: 10,
//   // createTimeoutMillis: 8000,
//   // acquireConnectionTimeout: 60000,
//   // reapIntervalMillis: 1000,
//   // createRetryIntervalMillis: 100,
//   // idleTimeoutMillis: 30000,
//   // connectionTimeoutMillis: 2000
// };

// const pool = new pg.Pool(config);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 20000,
  idleTimeoutMillis: 20000
});

pool.connect(function (err, _client, _done) {
  if (err) {
    console.log("error: ", err);
    process.exit(1);
  }
  // client.query(sql, function (err, _) {
  //   done();
  //   if (err) {
  //     console.log("error: ", err);
  //     process.exit(1);
  //   }
  //   process.exit(0);
  // });
});

pool.on("connect", () => {
  console.log("connected to the db");
});

module.exports = {
  pool
};

// pool shutdown
//pool.end();
