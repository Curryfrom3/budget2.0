const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
// /users/:userId/transactions
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
// controllers/applications.js

router.get('/:transactionId', (req, res) => {
  res.send(`here is your request param: ${req.params.transactionId}`);
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
// controllers/applications.js`

router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.transactions.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

//users/:userId/transactions
// Create Transaction Route: Add a new transaction
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/auth/sign-in');
    }

    // Validate the transaction data
    if (!req.body.name || !req.body.amount || !req.body.category || !req.body.type || !req.body.date) {
      return res.send('Please fill in all fields.');
    }

    // Create and save new transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // Push the transaction ID instead of the full object
    currentUser.transactions.push(newTransaction._id);
    await currentUser.save();

    // Redirect to transactions page
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete Transaction Route: Delete a specific transaction
// controllers/applications.js

router.delete('/:transactionId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.transactions.id(req.params.transactionId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// controllers/transactions.js

router.get('/:transactionId/edit', async (req, res) => {
  try {
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

// controllers/transactions.js`

router.put('/:transactionId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current transaction from the id supplied by req.params
    const transaction = currentUser.transactions.id(req.params.transactionId);
    // Use the Mongoose .set() method
    // this method updates the current transaction to reflect the new form
    // data on `req.body`
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
