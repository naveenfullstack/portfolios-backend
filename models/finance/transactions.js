const mongoose = require('mongoose');
const mediaxDB = require("../../databases/financeDB");
const { Decimal128 } = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema({
  userId: { type: String},
  title: { type: String},
  date : {type : Date},
  categoryId: { type: String},
  category: { type: String},
  amount: { type: Decimal128},
  is_income: { type: Boolean},
});

const Transaction = mediaxDB.model('Transactions', TransactionSchema);

module.exports = Transaction;
