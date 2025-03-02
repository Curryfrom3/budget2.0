const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// GET: Sign-up Page
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// GET: Sign-in Page
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

// GET: Sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// POST: Sign-up Logic
router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// POST: Sign-in Logic
router.post('/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }

    const validPassword = await bcrypt.compare(req.body.password, userInDatabase.password);
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }

    req.session.user = {
      _id: userInDatabase._id,
      username: userInDatabase.username,
    };

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;
