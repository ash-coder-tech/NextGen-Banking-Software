const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  accountNumber: {
  type: String,
  unique: true
},
  balance: { type: Number, default: 1000 }
});

module.exports = mongoose.model("User", UserSchema);
