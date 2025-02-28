const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  catagory: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  transactions: [transactionSchema],

});

const User = mongoose.model('User', userSchema);
// models/user.js



module.exports = User;
