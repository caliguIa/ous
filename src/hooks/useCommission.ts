import { Commission, CommissionRates } from '@/schemas';

type UseCommission = (amount: number, commissionRates: CommissionRates | undefined) => Commission;

const roundToTwoDecimalPlaces = (num: number) => Math.round(num * 100) / 100;

export const useCommission: UseCommission = (amount, commissionRates) => {
  if (!commissionRates || !commissionRates.length) {
    return { totalCommission: 0, commissionPerBand: [] };
  }

  let amountToUse = amount;
  if (amount < 0) {
    amountToUse = 0;
  } else if (!Number.isInteger(amount)) {
    amountToUse = roundToTwoDecimalPlaces(amount);
  }

  const result = commissionRates.reduce(
    // need to type here to stop ts complaining about the accumulator being immutable, we don't care in this instance
    (acc: Commission, commissionRate) => {
      const qualifyingRevenueAmount =
        amountToUse < commissionRate.min
          ? 0
          : roundToTwoDecimalPlaces(Math.min(amountToUse, commissionRate.max ?? Infinity) - commissionRate.min);

      const commission = roundToTwoDecimalPlaces(qualifyingRevenueAmount * commissionRate.rate);

      acc.totalCommission += commission;
      acc.commissionPerBand.push({ qualifyingRevenueAmount, commission, commissionRate });

      return acc;
    },
    { totalCommission: 0, commissionPerBand: [] }
  );

  return result;
};
