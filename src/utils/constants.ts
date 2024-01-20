import { CommissionRates } from '../schemas';

export const CUR_LANG = 'EN';

const COMMISSION_RATES: CommissionRates = [
  { min: 0, max: 5000, rate: 0 },
  { min: 5000, max: 10000, rate: 0.1 },
  { min: 10000, max: 15000, rate: 0.15 },
  { min: 15000, max: 20000, rate: 0.2 },
  { min: 20000, max: Infinity, rate: 0.25 },
];

export const COMMISSION_RATES_RESPONSE = JSON.stringify(COMMISSION_RATES) as unknown as CommissionRates;
