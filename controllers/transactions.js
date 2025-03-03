const express = require('express');
const router = express.Router();

const { User, Transaction } = require('../models/user.js'); // Correct import

// Show Route: Display a specific user's transactions
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id).populate('transactions'); // Populate the transactions array
    if (!currentUser) {
      return res.redirect('/auth/sign-in'); // Redirect if user not found
    }

    // Pass the user AND transactions to the view
    res.render('index', { transactions: currentUser.transactions, user: currentUser });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Show Transaction Details Route: Display a specific transaction
router.get('/:transactionId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/auth/sign-in'); // Redirect if user not found
    }

    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.redirect('/');
    }

    res.render('transactions/show.ejs', {
      user: currentUser,
      transaction: transaction
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create Transaction Route: Add a new transaction
router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/auth/sign-in'); // Redirect if user not found
    }

    // Validate the transaction data
    if (!req.body.name || !req.body.amount || !req.body.category || !req.body.type || !req.body.date) {
      return res.send('Please fill in all fields.');
    }

    // Create a new transaction instance
    const newTransaction = new Transaction(req.body);
    
    // Save the transaction first
    await newTransaction.save();

    // Add the new transaction to the user's transactions array
    currentUser.transactions.push(newTransaction);
    
    // Save changes to the user
    await currentUser.save();

    // Redirect to the user's transactions page
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
