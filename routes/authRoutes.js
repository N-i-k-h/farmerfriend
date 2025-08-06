const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  agriculture: String,
  password: String,
  phone: String,
});
const User = mongoose.model('User', userSchema);

// Routes

// Show login form
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

// Show register form
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../register.html'));
});

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, agriculture, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('❌ Email already exists. Please login.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      agriculture,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).send('Server error during registration');
  }
});

// Show login form
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.send('❌ Invalid user');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('❌ Invalid password');

    res.sendFile(path.join(__dirname, '../success.html'));
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).send('Server error during login');
  }
});

module.exports = router;
