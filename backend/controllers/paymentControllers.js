const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Payment = require("../models/paymentModel");
const Loan = require("../models/loanModel");

// Create a payment
exports.createPayment = catchAsyncErrors(async (req, res, next) => {
  const { paymentAmount } = req.body;

  const loanId = req.params.id;

  const currespondingLoan = await Loan.findById(loanId);

  if (!currespondingLoan) {
    return next(new ErrorHandler(`Loan does not exist with Id: ${loanId}`));
  }

  if (
    paymentAmount >
    currespondingLoan.loanAmount - currespondingLoan.loanRepaid
  ) {
    return next(new ErrorHandler(`You can not pay more than remained amount`));
  } else if (paymentAmount < currespondingLoan.loanEmi) {
    return next(new ErrorHandler(`You can not pay less than emi amount`));
  }

  const payment = await Payment.create({
    paymentAmount,
    user: req.user._id,
    loan: loanId,
  });

  let newLoanData = {
    loanRepaid: Number(currespondingLoan.loanRepaid) + Number(paymentAmount),
  };

  if (
    currespondingLoan.loanRepaid + paymentAmount >=
    currespondingLoan.loanAmount
  ) {
    newLoanData.loanStatus = "Paid";
  }

  const updatedLoanDetails = await Loan.findByIdAndUpdate(loanId, newLoanData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Payment done sucessfully",
    payment,
    updatedLoanDetails,
  });
});

// Get all payments loan (User) (admin)
exports.getAllPaymentsOfLoan = catchAsyncErrors(async (req, res, next) => {
  const payments = await Loan.findById({ loan: req.params.id });

  res.status(200).json({
    success: true,
    payments,
  });
});

// Get all payments of User
exports.getAllPaymentsOfUser = catchAsyncErrors(async (req, res, next) => {
  const payments = await Payment.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    payments,
  });
});

// Get single payment (User) (admin)
exports.getSinglePayment = catchAsyncErrors(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(
      new ErrorHandler(`payment does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    payment,
  });
});

// Get all payments(admin)
exports.getAllPayments = catchAsyncErrors(async (req, res, next) => {
  const payments = await Payment.find();

  res.status(200).json({
    success: true,
    payments,
  });
});
