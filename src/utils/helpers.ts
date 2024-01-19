import { COMMISSION_RATES } from './constants';

type CommissionBand = { qualifyingRevenueAmount: number; commission: number };
type Commission = { totalCommission: number; commissionPerBand: CommissionBand[] };
type GetCommission = (amount: number) => Commission;

export const getCommission: GetCommission = (amount) => {
  const commissionRateCeilingIndex = COMMISSION_RATES.findIndex((commissionRate) => amount < commissionRate.max);

  const result = COMMISSION_RATES.slice(0, commissionRateCeilingIndex + 1).reduce(
    // need to type here to stop ts complaining about the accumulator being immutable
    (acc: Commission, commissionRate) => {
      const qualifyingRevenueAmount = Math.min(amount, commissionRate.max) - commissionRate.min;
      const commission = qualifyingRevenueAmount * commissionRate.rate;
      acc.totalCommission += commission;
      acc.commissionPerBand.push({ qualifyingRevenueAmount, commission });
      return acc;
    },
    { totalCommission: 0, commissionPerBand: [] }
  );

  // round to 2 decimal places
  result.totalCommission = Math.round(result.totalCommission * 100) / 100;

  return result;
};
