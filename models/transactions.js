const transactionSchema = new mongoose.Schema({

  name: { type: String, 
    required: true
   }, // Name of transaction

  amount: { type: Number, 
    required: true 
  }, // Dollar amount

  category: { type: String,
     enum: ['income', 'food', 'transportation', 'entertainment', 'bills', 'savings', 'other'], 
     required: true 
    }, // Spending category

  type: { type: String,
     enum: ['income', 'expense'], 
     required: true 
    }, // Transaction type

  date: { type: Date, 
    required: true 
  }, // Date of transaction

});
module.exports = mongoose.model('Transaction', transactionSchema);