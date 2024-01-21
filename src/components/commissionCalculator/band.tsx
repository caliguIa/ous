import { FC } from 'react';
import { useCommissionRates } from '../../hooks';
import { LANG } from '../../utils';

type Props = {
  index: number;
  commission: number;
  qualifyingRevenueAmount: number;
};

export const Band: FC<Props> = ({ index, commission }: Props) => {
  const { data: commissionRates } = useCommissionRates({ willError: false });
  if (!commissionRates?.length) return null;

  const { min: bandMin, max: bandMax, rate } = commissionRates[index];

  // TODO: make elements below into reuseable component
  return (
    <div className="bg-gray-50 rounded-md border border-gray-300 p-2 m-2 min-w-64 text-sm font-bold text-black">
      <div className="flex flex-row justify-between ">
        <div>
          <p className="pr-1 flex ">{LANG['EN']['WIDGET.BAND.FROM']}</p>
          <p className="pr-1 text-xl">
            {LANG['EN']['CURRENCY_SYMBOL']}
            {bandMin}
            {!bandMax && LANG['EN']['PLUS_SYMBOL']}
          </p>
        </div>
        {!!bandMax && (
          <div className="min-w-20">
            <p className="pr-1 ">{LANG['EN']['WIDGET.BAND.TO']}</p>
            <p className="text-xl">
              {LANG['EN']['CURRENCY_SYMBOL']}
              {bandMax}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="pr-1">{LANG['EN']['WIDGET.BAND.COMMISSION_SUB']}</p>
          <p className="text-4xl">
            {LANG['EN']['CURRENCY_SYMBOL']}
            {commission}
          </p>
        </div>
        <div className="min-w-20">
          <p>{LANG['EN']['WIDGET.BAND.RATE']}</p>
          <p className="text-xl">
            {rate}
            {LANG['EN']['PERCENT_SYMBOL']}
          </p>
        </div>
      </div>
    </div>
  );
};
