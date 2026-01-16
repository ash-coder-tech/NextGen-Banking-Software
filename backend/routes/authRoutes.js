const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

async function generateUniqueAccountNumber() {
  let accountNumber;
  let exists = true;

  while (exists) {
    accountNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    exists = await User.findOne({ accountNumber });
  }

  return accountNumber;
}


// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const accountNumber = await generateUniqueAccountNumber();

  const user = new User({
    name,
    email,
    password: hashedPassword,
    accountNumber
  });

  await user.save();
  res.json({ message: "User registered successfully" });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Wrong password" });

  // BASIC LOGIN → return user data
  res.json({
    message: "Login successful",
    user
  });
});

module.exports = router;
