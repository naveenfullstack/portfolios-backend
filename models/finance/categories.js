const mongoose = require('mongoose');
const mediaxDB = require("../../databases/financeDB");
const { Decimal128 } = mongoose.Schema.Types;

const CategorySchema = new mongoose.Schema({
  userId: { type: String},
  title: { type: String},
  amount: { type: Decimal128},
  is_income: { type: Boolean},
});

const Category = mediaxDB.model('Categories', CategorySchema);

module.exports = Category;
