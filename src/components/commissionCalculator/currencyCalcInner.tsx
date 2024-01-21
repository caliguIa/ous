import { useCallback, useState, ChangeEventHandler, FormEventHandler } from 'react';
import { Breakdown } from './breakdown';
import { Calculate } from './input';
import { TotalCommission } from './total';
import { useCommission, useCommissionRates } from '@/hooks';
import { CommissionBand } from '@/schemas';

export const CommissionCalcInner = () => {
  const [revenueValue, setRevenueValue] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [commissionPerBand, setCommissionPerBand] = useState<CommissionBand[]>([]);

  const { data: commissionRates } = useCommissionRates({ willError: false });

  const hanndleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setRevenueValue(+e.target.value);
  }, []);

  const calculateCommission = useCallback<FormEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();
      const { totalCommission, commissionPerBand } = useCommission(revenueValue, commissionRates);
      setTotalCommission(totalCommission);
      setCommissionPerBand(commissionPerBand);
    },
    [revenueValue, commissionRates, useCommission]
  );

  return (
    <>
      <div>
        <Calculate revenueValue={revenueValue} onChange={hanndleInputChange} onClick={calculateCommission} />
        <TotalCommission totalCommission={totalCommission} />
      </div>
      <Breakdown commissionPerBand={commissionPerBand} />
    </>
  );
};
