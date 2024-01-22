import { FC } from 'react';
import { Breakdown } from './breakdown';
import { Calculate } from './input';
import { TotalCommission } from './total';

export const CommissionCalcInner: FC = () => {
  return (
    <>
      <div>
        <Calculate />
        <TotalCommission />
      </div>
      <Breakdown />
    </>
  );
};
