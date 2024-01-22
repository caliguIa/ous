import React, { Dispatch, SetStateAction } from 'react';

export type CommissionContextType = {
  revenueValue: number;
  willError: boolean;
};

export const CommissionContext = React.createContext<CommissionContextType>({
  revenueValue: 0,
  willError: false,
});

export type CommissionDispatchContextType = {
  setRevenueValue: Dispatch<SetStateAction<number>>;
  setWillError: Dispatch<SetStateAction<boolean>>;
};

export const CommissionDispatchContext = React.createContext<CommissionDispatchContextType>({
  setRevenueValue: () => {
    return;
  },
  setWillError: () => {
    return;
  },
});
