import { useCallback, useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useCommission, useCommissionRates } from '../../hooks';
import { Breakdown } from './breakdown';
import { CommissionBand } from '../../schemas';
import { LANG } from '../../utils';

export const Widget = () => {
  const [revenueValue, setRevenueValue] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [commissionPerBand, setCommissionPerBand] = useState<CommissionBand[]>([]);

  const { data: commissionRates, isLoading, isError } = useCommissionRates({ willError: false });

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

  if (isLoading) {
    return <div>{LANG['EN']['WIDGET.LOADING']}</div>;
  }
  if (isError || !commissionRates?.length) {
    return <div>{LANG['EN']['WIDGET.ERROR_RATES']}</div>;
  }

  // TODO context for current language

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="bg-white h-auto w-100 p-4 m-5 rounded-md border border-gray-300">
        <h3 className="text-black text-lg font-black mb-5">{LANG['EN']['WIDGET.TITLE']}</h3>
        <div>
          <div className="flex flex-col">
            <label>{LANG['EN']['WIDGET.INPUT_LABEL']}</label>
            <input
              type="number"
              value={revenueValue}
              onChange={hanndleInputChange}
              className="border-gray-300 border rounded-md p-3 "
            />
          </div>
          <button onClick={calculateCommission} type="button" className="bg-blue-500 text-white rounded-md p-2 my-4">
            {LANG['EN']['WIDGET.INPUT_BUTTON']}
          </button>
          <div className="border border-gray-300 rounded-md p-3 my-4 w-fit">
            <h4 className="text-sm font-bold">{LANG['EN']['WIDGET.TOTAL_COMMISSION']}</h4>
            <p className="text-3xl font-bold">
              {LANG['EN']['CURRENCY_SYMBOL']}
              {totalCommission}
            </p>
          </div>
        </div>
        <Breakdown commissionPerBand={commissionPerBand} />
      </div>
    </div>
  );
};
