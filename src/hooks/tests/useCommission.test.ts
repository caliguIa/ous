import { useCommission } from '..';
import { CommissionRates } from '../../schemas';

const COMMISSION_RATES: CommissionRates = [
  { min: 0, max: 5000, rate: 0 },
  { min: 5000, max: 10000, rate: 0.1 },
  { min: 10000, max: 15000, rate: 0.15 },
  { min: 15000, max: 20000, rate: 0.2 },
  { min: 20000, max: null, rate: 0.25 },
];

describe('should calculate commission successfully if valid args passed, outputting all bands (even if no qualifying revenue in a band)', () => {
  it('should return 1850 if 18000 passed', () => {
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

  it('should return 0 if 5000 passed', () => {
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

  it('should return 0 if 0 passed', () => {
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

  it('should return 0.1 if 5001 passed', () => {
    const received = useCommission(5001, COMMISSION_RATES);
    const expected = {
      totalCommission: 0.1,
      commissionPerBand: [
        {
          qualifyingRevenueAmount: 5000,
          commission: 0,
        },
        {
          qualifyingRevenueAmount: 1,
          commission: 0.1,
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

  it('should return 0.1 if 5010.74323421231 passed', () => {
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

  it('should return 1.07 if 5010.74323421231 passed', () => {
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

  it('should return 3057.5 if 23230 passed', () => {
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
});

describe('should return 0 if invalid args passed', () => {
  it('should return 0 if a negative number passed', () => {
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

  it('should return 0 if commission rates is null', () => {
    const received = useCommission(18000, undefined);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [],
    };

    expect(received).toEqual(expected);
  });

  it('should return 0 if commission rates is an empty array', () => {
    const received = useCommission(18000, []);
    const expected = {
      totalCommission: 0,
      commissionPerBand: [],
    };

    expect(received).toEqual(expected);
  });
});
