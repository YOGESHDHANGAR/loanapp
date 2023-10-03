const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentAmount: {
    type: Number,
    required: [true, "Please Enter a valid amount"],
  },
  loan: {
    type: mongoose.Schema.ObjectId,
    ref: "Loan",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
