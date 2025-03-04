const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/transactions.js'); 
const User = require('../models/user.js'); 

// Show Route: Display a specific user's transactions
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id).populate('transactions'); // Populate the transactions array
    if (!currentUser) {
      return res.redirect('/auth/sign-in'); // Redirect if user not found
    }

    // Pass the user AND transactions to the view
    res.render('transactions/index.ejs', { transactions: currentUser.transactions, user: currentUser });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create New Transaction Route: Display the form to create a new transaction
router.get('/new', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/auth/sign-in'); // Redirect if user not found
    }

    // Render the form to create a new transaction
    res.render('transactions/new.ejs', { user: currentUser });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Show Transaction Details Route: Display a specific transaction
router.get('/:transactionId', async (req, res) => {
  try {
    // Check if the transactionId is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.transactionId)) {
      return res.redirect('/'); // Redirect if invalid ObjectId
    }

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
    console.log(error);
    res.redirect('/');
  }
});

// Delete Transaction Route: Delete a specific transaction
router.delete('/:transactionId', async (req, res) => {
  try {
    // Check if the transactionId is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.transactionId)) {
      return res.redirect('/'); // Redirect if invalid ObjectId
    }

    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete a transaction
    currentUser.transactions.id(req.params.transactionId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the transactions index view
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit Transaction Route: Display the form to edit a transaction
router.get('/:transactionId/edit', async (req, res) => {
  try {
    // Check if the transactionId is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.transactionId)) {
      return res.redirect('/'); // Redirect if invalid ObjectId
    }

    const currentUser = await User.findById(req.session.user._id);
    const transaction = currentUser.transactions.id(req.params.transactionId);
    res.render('transactions/edit.ejs', {
      transaction: transaction,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update Transaction Route: Update a specific transaction
router.put('/:transactionId', async (req, res) => {
  try {
    // Check if the transactionId is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.transactionId)) {
      return res.redirect('/'); // Redirect if invalid ObjectId
    }

    const currentUser = await User.findById(req.session.user._id);
    const transaction = currentUser.transactions.id(req.params.transactionId);
    transaction.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current transaction
    res.redirect(
      `/users/${currentUser._id}/transactions/${req.params.transactionId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
