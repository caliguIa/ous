import { useCommission } from '..';
import { CommissionRates } from '@/schemas';

const COMMISSION_RATES: CommissionRates = [
  { min: 0, max: 5000, rate: 0 },
  { min: 5000, max: 10000, rate: 0.1 },
  { min: 10000, max: 15000, rate: 0.15 },
  { min: 15000, max: 20000, rate: 0.2 },
  { min: 20000, max: null, rate: 0.25 },
];

describe('should return commission successfully if valid args passed', () => {
  it('when amount is positive integer', () => {
    const received = useCommission(18000, COMMISSION_RATES);
    const expected = {
      totalCommission: 1850,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 5000,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 5000,
          commission: 500,
        },
        {
          qualifyingRevenueAmount: 5000,
          commission: 750,
        },
        {
          qualifyingRevenueAmount: 3000,
          commission: 600,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
      ],
    };

    expect(received).toEqual(expected);
  });

  it('when amount equtes to upper bound', () => {
    const received = useCommission(5000, COMMISSION_RATES);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 5000,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
      ],
    };

    expect(received).toEqual(expected);
  });

  it('when exceeds upper bound', () => {
    const received = useCommission(23230, COMMISSION_RATES);
    const expected = {
      totalCommission: 3057.5,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 5000,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 5000,
          commission: 500,
        },
        {
          qualifyingRevenueAmount: 5000,
          commission: 750,
        },
        {
          qualifyingRevenueAmount: 5000,
          commission: 1000,
        },
        {
          qualifyingRevenueAmount: 3230,
          commission: 807.5,
        },
      ],
    };

    expect(received).toEqual(expected);
  });

  it('when amount equates to minimum value', () => {
    const received = useCommission(0, COMMISSION_RATES);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
      ],
    };

    expect(received).toEqual(expected);
  });

  it('when amount is floating point', () => {
    const received = useCommission(5010.74323421231, COMMISSION_RATES);
    const expected = {
      totalCommission: 1.07,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 5000,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 10.74,
          commission: 1.07,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
      ],
    };

    expect(received).toEqual(expected);
  });
});

describe('should return default values if invalid args passed', () => {
  it('when a negative number is passed', () => {
    const received = useCommission(-2342452, COMMISSION_RATES);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 0,
          commission: 0,
        },
      ],
    };

    expect(received).toEqual(expected);
  });

  it('when commission rates is null', () => {
    const received = useCommission(18000, undefined);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [],
    };

    expect(received).toEqual(expected);
  });

  it('when commission rates is an empty array', () => {
    const received = useCommission(18000, []);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [],
    };

    expect(received).toEqual(expected);
  });
});
