import { useCallback, useMemo, useState, ChangeEventHandler } from 'react';
import { getCommission } from '../../utils';
import { COMMISSION_RATES } from '../../utils';

export const Widget = () => {
  const [revenueValue, setRevenueValue] = useState<number>(0);
  const { commissionPerBand, totalCommission } = useMemo(() => getCommission(revenueValue), [revenueValue]);

  const hanndleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setRevenueValue(+e.target.value);
  }, []);

  return (
    <div className="bg-gray-100">
      <input type="number" value={revenueValue} onChange={hanndleInputChange} />
      {commissionPerBand.map((band, i) => {
        const { min: bandMin, max: bandMax } = COMMISSION_RATES[i];
        const { qualifyingRevenueAmount, commission } = band;
        return (
          <div key={`${bandMin}_${bandMax}_band`}>
            <div>
              £{bandMin} to £{bandMax}
            </div>
            <div className="text-xl font-medium text-black">qualifying revenue: £{qualifyingRevenueAmount}</div>
            <div>commission for this band: £{commission}</div>
          </div>
        );
      })}
      <div>total commission: £{totalCommission}</div>
    </div>
  );
};
