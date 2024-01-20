import { useCallback, useMemo, useState, ChangeEventHandler } from 'react';
import { LANG, CUR_LANG } from '../../utils';
import { useCommission, useCommissionRates } from '../../hooks';

export const Widget = () => {
  const [revenueValue, setRevenueValue] = useState<number>(0);
  const { data: commissionRates, isLoading, isError } = useCommissionRates({ willError: false });

  const { commissionPerBand, totalCommission } = useMemo(
    () => useCommission(revenueValue, commissionRates),
    [revenueValue, commissionRates]
  );
  console.log('commissionPB', commissionPerBand);
  console.log('TC', totalCommission);

  const hanndleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setRevenueValue(+e.target.value);
  }, []);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError || !commissionRates?.length) {
    return <div>error fetching commission rates</div>;
  }

  return (
    <div className="bg-gray-100">
      <input type="number" value={revenueValue} onChange={hanndleInputChange} />
      {commissionPerBand.map((band, i) => {
        const { min: bandMin, max: bandMax } = commissionRates[i];
        const { qualifyingRevenueAmount, commission } = band;
        return (
          <div key={`${bandMin}_${bandMax}_band`}>
            <div>
              £{bandMin} to £{bandMax}
            </div>
            <div className="text-xl font-medium text-black">
              {LANG[CUR_LANG]['WIDGET.BAND.QUALIFYING_REVENUE']} £{qualifyingRevenueAmount}
            </div>
            <div>
              {LANG[CUR_LANG]['WIDGET.BAND.COMMISSION']} £{commission}
            </div>
          </div>
        );
      })}
      <div>
        {LANG[CUR_LANG]['WIDGET.TOTAL_COMMISSION']} £{totalCommission}
      </div>
    </div>
  );
};
