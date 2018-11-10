const pgp = require('pg-promise')({
    capSQL: true
});

const db = pgp({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

module.exports = {db,pgp};
