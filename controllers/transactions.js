// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
// controllers/applications.js

router.get('/', (req, res) => {

router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

router.get('/', async (req, res) => {
  try {
    res.render('transactions/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

});

module.exports = router;
