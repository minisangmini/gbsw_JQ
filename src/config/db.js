const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: env.process.DB_HOST,
    user: env.process.DB_USER,
    password: env.process.DB_PSWORD,
    database: env.process.DB_DATABASE,
    port: 3306
});

db.connect();

module.exports = db;