// server/models/LoginAttempt.js
const mongoose = require('mongoose');

const LoginAttemptSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoginAttempt', LoginAttemptSchema);
