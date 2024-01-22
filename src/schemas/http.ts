import { CommissionRates } from './commission';

export type HttpResponse<T> = {
  data: T;
  status: number;
  error?: string;
};

export type Headers = {
  userId: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  companyId: number;
};

export type Company = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  commissionRates: CommissionRates;
};

export type Database = {
  users: Record<number, User>;
  companies: Record<number, Company>;
};
