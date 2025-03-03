const mongoose = require('mongoose');

// Define transaction schema
const transactionSchema = new mongoose.Schema({

  name: { type: String,
  required: true }, // Name of transaction

  amount: { type: Number, 
    required: true }, // Dollar amount

  category: { 
    type: String,
    enum: ['income', 'food', 'transportation', 'entertainment', 'bills', 'savings', 'other'], 
    required: true 
  }, // Spending category
  type: { 
    type: String,
    enum: ['income', 'expense'], 
    required: true 
  }, // Transaction type
  date: { type: Date, required: true } // Date of transaction
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }] // Reference Transactions
});

// Create models
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export both models
module.exports = User;
