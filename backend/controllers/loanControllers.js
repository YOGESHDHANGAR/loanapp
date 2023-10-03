const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Loan = require("../models/loanModel");

// Register a loan
exports.registerLoan = catchAsyncErrors(async (req, res, next) => {
  const { loanType, loanAmount, loanTerm } = req.body;

  const registerloan = await Loan.create({
    loanType,
    loanAmount,
    loanTerm,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    registerloan,
  });
});

// Get loan Detail
exports.getLoanDetails = catchAsyncErrors(async (req, res, next) => {
  const loandeatils = await Loan.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    loandeatils,
  });
});

// All loans of user
exports.getAllLoansOfUser = catchAsyncErrors(async (req, res, next) => {
  const allloansofuser = await Loan.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    allloansofuser,
  });
});

// Get all loans(admin)
exports.getAllLoans = catchAsyncErrors(async (req, res, next) => {
  const loans = await Loan.find();

  res.status(200).json({
    success: true,
    loans,
  });
});

// Get single loan (admin)
exports.getSingleLoan = catchAsyncErrors(async (req, res, next) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return next(
      new ErrorHandler(`loan does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    loan,
  });
});

// update loan details (admin)
exports.updateSingleLoan = catchAsyncErrors(async (req, res, next) => {
  const newLoanData = {
    loanStatus: req.body.loanStatus,
  };

  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return next(
      new ErrorHandler(`loan does not exist with Id: ${req.params.id}`, 404)
    );
  }

  if (loan.loanStatus === "Approved") {
    return next(new ErrorHandler("Loan Already Approved", 401));
  } else if (loan.loanStatus === "Rejected") {
    return next(new ErrorHandler("Loan Already Rejected", 401));
  }

  const loanEmi = (loan.loanAmount + loan.loanInterest) / loan.loanTerm;
  const loanEndDate = new Date(
    Date.now() + 7 * loan.loanTerm * 24 * 60 * 60 * 1000
  );

  if (newLoanData.loanStatus === "Approved") {
    newLoanData.loanStartDate = Date.now();
    newLoanData.loanEmi = loanEmi;
    newLoanData.loanEndDate = loanEndDate;
  }

  const loanDetails = await Loan.findByIdAndUpdate(req.params.id, newLoanData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    loanDetails,
  });
});

// Delete loan --Admin
exports.deleteLoan = catchAsyncErrors(async (req, res, next) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return next(
      new ErrorHandler(`loan does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await Loan.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "loan Deleted Successfully",
  });
});
