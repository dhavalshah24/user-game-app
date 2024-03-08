const express = require('express');
const router = express.Router();
const userService = require('../../../services/v1/user/userService');

router.post('/send-otp', async (req, res) => {
  const { mobile } = req.body;

  if(!mobile) {
    return res.status(400).send({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const otp = await userService.sendOTP(mobile);
    return res.send({ success: true, message: 'OTP sent successfully', data: otp });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const { phone, name, dob, email } = req.body;

  if (!phone || !name || !dob || !email) {
    return res.status(400).send({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const userId = await userService.registerUser(phone, name, dob, email);
    return res.status(200).send({ success: true, message: 'User registered successfully', data: userId });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.message === 'User with the same phone number or email already exists') {
      statusCode = 400;
      errorMessage = error.message;
    }
    return res.status(statusCode).send({ success: false, message: errorMessage });
  }
});

module.exports = router;
