import { FC, useState } from 'react';
import {
  CommissionDispatchContext,
  CommissionDispatchContextType,
  CommissionContext,
  CommissionContextType,
} from './contexts';
import { useRevenueValue, useRevenueValueDispatch } from './hooks';

type Props = {
  children: JSX.Element[];
};

const CommissionValuesWrapper: FC<Props> = ({ children }: Props) => {
  const [revenueValue, setRevenueValue] = useState<number>(0);
  const [willError, setWillError] = useState<boolean>(false);

  const values: CommissionContextType = {
    revenueValue,
    willError,
  };

  const setters: CommissionDispatchContextType = {
    setRevenueValue,
    setWillError,
  };

  return (
    <CommissionContext.Provider value={values}>
      <CommissionDispatchContext.Provider value={setters}>{children}</CommissionDispatchContext.Provider>
    </CommissionContext.Provider>
  );
};

export default CommissionValuesWrapper;

export { useRevenueValue, useRevenueValueDispatch };
