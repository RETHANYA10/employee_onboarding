const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',         // use your MySQL password if any
  database: 'onboarding',
});

module.exports = pool;

