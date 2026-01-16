const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  senderAccount: String,
  receiverAccount: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
