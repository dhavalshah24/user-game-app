const pool = require('../../../config/db');
const { decryptUserId } = require('../../../utils/encryption');

async function getOverallScores(userId) {
  try {
    userId = parseInt(decryptUserId(userId));

    // Calculate total scores for the user
    const [rows, fields] = await pool.execute('SELECT SUM(score) AS totalScore FROM scores WHERE userId = ?', [userId]);
    const totalScore = rows[0].totalScore || 0;

    // Calculate rank of the user based on total scores
    const [rankRows, rankFields] = await pool.execute('SELECT COUNT(*) AS user_rank FROM (SELECT userId, SUM(score) AS total_score FROM scores GROUP BY userId) AS user_scores WHERE total_score > ?;', [totalScore]);
    const rank = rankRows[0].user_rank + 1;

    return { userId, rank, totalScore };
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getWeeklyScores(userId) {
  try {
    userId = parseInt(decryptUserId(userId));

    // Calculate the start and end of the current week (Friday to Thursday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (today.getDay() + 2) % 7);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - 4);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    // Calculate weekly scores for the user
    const [rows, fields] = await pool.execute('SELECT SUM(score) AS totalScores FROM scores WHERE userId = ? AND date >= ? AND date < ?', [userId, startOfWeek, endOfWeek]);
    const weeklyScore = rows[0].totalScores || 0;

    // Calculate rank of the user based on weekly scores
    const [rankRows, rankFields] = await pool.execute('SELECT COUNT(*) AS user_rank FROM (SELECT userId, SUM(score) AS total_score FROM scores WHERE date >= ? AND date < ? GROUP BY userId HAVING total_score > ?) AS user_scores;', [startOfWeek, endOfWeek, weeklyScore]);
    const rank = rankRows[0].user_rank + 1;

    return { userId, rank, weeklyScore };
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getOverallScores,
  getWeeklyScores,
};
