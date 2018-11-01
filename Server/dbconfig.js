const Pool = require('pg').Pool;

let config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
}
let pool = new Pool(config);

module.exports = pool;
