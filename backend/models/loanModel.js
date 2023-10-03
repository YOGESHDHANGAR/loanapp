const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  loanType: {
    type: String,
    default: "Personal",
  },
  loanAmount: {
    type: Number,
    required: [true, "Please enter laon amount"],
    max: [5000000, "Loan cannot exceed ₹50Lac"],
    min: [1000, "Loan should should be more than ₹1000"],
  },
  loanStatus: {
    type: String,
    default: "Pending",
  },
  loanTerm: {
    type: Number,
    required: [
      true,
      "Please enter the nubmer of installments you want to repay the loan",
    ],
    min: [1, "Minimum 1 installment is required"],
    max: [120, "Maximum 120 installment are allowed"],
  },
  loanStartDate: {
    type: Date,
  },
  loanEndDate: {
    type: Date,
  },
  loanInterest: {
    type: Number,
    default: 10,
  },
  loanEmi: {
    type: Number,
  },
  loanRepaid: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Loan", loanSchema);
