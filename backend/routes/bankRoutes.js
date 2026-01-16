const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const router = express.Router();

// TRANSFER MONEY
router.post("/transfer", async (req, res) => {
  const { senderId, receiverAccount, amount } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ accountNumber: receiverAccount });

    if (!sender || !receiver)
      return res.json({ message: "Invalid account details" });

    if (sender.balance < amount)
      return res.json({ message: "Insufficient balance" });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    await transaction.save();


    res.json({ message: "Money transferred successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Transfer failed" });
  }
});

// DEPOSIT MONEY
router.post("/deposit", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    if (!amount || amount <= 0) {
      return res.json({ message: "Invalid deposit amount" });
    }

    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });

    // Update balance
    user.balance += amount;
    await user.save();

    // Save transaction record
    const transaction = new Transaction({
      senderAccount: null,           // null for deposits
      receiverAccount: user.accountNumber,
      amount,
      type: "deposit"
    });

    await transaction.save();

    res.json({ message: `₹${amount} deposited successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deposit failed" });
  }
});

module.exports = router;
