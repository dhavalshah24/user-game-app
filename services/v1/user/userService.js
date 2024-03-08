const pool = require('../../../config/db');

async function sendOTP(mobile) {
  return '1234';
}

async function registerUser(phone, name, dob, email) {
  try {
    // Check if a user with the same phone number or email already exists
    const [existingUserRows, existingUserFields] = await pool.execute('SELECT * FROM users WHERE phone = ? OR email = ?', [phone, email]);
    if (existingUserRows.length > 0) {
      return Promise.reject(new Error('User with the same phone number or email already exists'));
    }

    const [insertUserRows, insertUserFields] = await pool.execute('INSERT INTO users (phone, name, dob, email) VALUES (?, ?, ?, ?)', [phone, name, dob, email]);
    return { userId: insertUserRows.insertId };

  } catch (error) {
    return Promise.reject(new Error('Error registering user'));
  }
}

module.exports = {
  sendOTP,
  registerUser,
};
