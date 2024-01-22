export type CommissionRate = { min: number; max: number | null; rate: number };
export type CommissionRates = CommissionRate[];

export type CommissionBand = { qualifyingRevenueAmount: number; commission: number; commissionRate: CommissionRate };
export type Commission = { totalCommission: number; commissionPerBand: CommissionBand[] };
