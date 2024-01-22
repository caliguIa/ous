import { useContext } from 'react';
import {
  CommissionDispatchContext,
  CommissionContext,
  CommissionDispatchContextType,
  CommissionContextType,
} from './contexts';

export const useRevenueValue = (): CommissionContextType => {
  const revenueValues = useContext(CommissionContext);

  return revenueValues;
};

export const useRevenueValueDispatch = (): CommissionDispatchContextType => {
  const revenueValueSetters = useContext(CommissionDispatchContext);

  return revenueValueSetters;
};
