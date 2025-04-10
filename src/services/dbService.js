// src/services/dbService.js
const mysql = require('mysql2/promise');
const { setCache } = require('./cacheService');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const saveEvent = async (data) => {
  const { userId, action, timestamp } = data;
  const query = 'INSERT INTO events (user_id, action, timestamp) VALUES (?, ?, ?)';
  await pool.execute(query, [userId, action, timestamp]);
  await setCache( {
    prefix: 'user',
    identifier: `${userId}:lastAction`,
    data: data
  })
};

module.exports = {
  saveEvent,
  query: (...args) => pool.query(...args), // ✅ Expose query like this
  execute: (...args) => pool.execute(...args),
};