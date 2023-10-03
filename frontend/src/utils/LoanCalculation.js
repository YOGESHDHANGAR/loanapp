export const calculateEMIDatesWithExtraPayments = (
  loanAmount,
  numInstallments,
  startDate,
  paidAmount,
  isLoanPaid
) => {
  const emiDetails = [];
  let currentDate = new Date(startDate);
  const currentDateAndTime = new Date();
  let currentRemainingAmount = loanAmount;
  let paidInstallments = 0;

  for (let i = 0; i < numInstallments; i++) {
    if (currentDate < currentDateAndTime) {
      paidInstallments++;
    } else {
      break;
    }
    currentDate.setDate(currentDate.getDate() + 7);
  }

  const remainingInstallments = numInstallments - paidInstallments;

  const paidInstallmentAmount = paidAmount / paidInstallments;

  const futureInstallmentAmount =
    (loanAmount - paidAmount) / remainingInstallments;

  for (let i = 0; i < numInstallments; i++) {
    const status = currentDate < currentDateAndTime ? "Paid" : "Pending";

    if (currentDate < currentDateAndTime) {
      emiDetails.push({
        date: currentDate.toDateString(),
        amount: paidInstallmentAmount,
        status: status,
      });
    } else {
      if (isLoanPaid) {
        emiDetails.push({
          date: currentDate.toDateString(),
          amount: 0,
          status: "Paid",
        });
      } else {
        emiDetails.push({
          date: currentDate.toDateString(),
          amount: futureInstallmentAmount,
          status: status,
        });
      }
    }

    currentDate.setDate(currentDate.getDate() + 7);

    if (currentRemainingAmount <= 0) {
      break;
    }
  }

  return {
    emiDetails,
    remainingAmount: currentRemainingAmount,
    paidInstallments,
    remainingInstallments,
  };
};
