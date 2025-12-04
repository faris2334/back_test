const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const sslOption = process.env.DB_SSL === 'true'
  ? { rejectUnauthorized: false }
  : null;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: sslOption,
  connectTimeout: 10000,
});

module.exports = db;
