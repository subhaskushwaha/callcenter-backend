require('dotenv').config();
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
      process.exit(1);
    }
    console.log("MySQL Connected!");
    connection.release();
});

module.exports = db;