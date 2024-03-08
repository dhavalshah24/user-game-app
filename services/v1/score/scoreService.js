const pool = require('../../../config/db');

async function getScoreCountToday(userId) {
  try {
    const [rows, fields] = await pool.execute('SELECT COUNT(*) AS scoreCount FROM scores WHERE userId = ? AND DATE(date) = CURDATE()', [userId]);
    const count = rows[0].scoreCount;
    return count
  } catch (error) {
    return Promise.reject(error);
  }
}

async function saveScore(userId, score) {
  try {
    await pool.execute('INSERT INTO scores (userId, score) VALUES (?, ?)', [userId, score]);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  saveScore,
  getScoreCountToday,
};
