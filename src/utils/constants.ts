import { CommissionRates, Company, Database, User } from '@/schemas';

export const CUR_LANG = 'EN';

export const COMMISSION_RATES: CommissionRates = [
  { min: 0, max: 5000, rate: 0 },
  { min: 5000, max: 10000, rate: 0.1 },
  { min: 10000, max: 15000, rate: 0.15 },
  { min: 15000, max: 20000, rate: 0.2 },
  { min: 20000, max: Infinity, rate: 0.25 },
];

export const HEADERS = {
  userId: 123,
};

const USERS: Record<number, User> = {
  123: {
    id: 123,
    name: 'John Doe',
    email: 'john@doe.com',
    companyId: 12345,
  },
  456: {
    id: 456,
    name: 'Jane Doe',
    email: 'jane@doe.com',
    companyId: 98765,
  },
};

const COMPANIES: Record<number, Company> = {
  12345: {
    id: 12345,
    name: 'Company 1',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    commissionRates: COMMISSION_RATES,
  },
  98765: {
    id: 98765,
    name: 'Company 2',
    address: '987 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    commissionRates: COMMISSION_RATES,
  },
};

export const DB: Database = {
  users: USERS,
  companies: COMPANIES,
};

export const COMMISSION_RATES_RESPONSE = JSON.stringify(COMMISSION_RATES) as unknown as CommissionRates;
