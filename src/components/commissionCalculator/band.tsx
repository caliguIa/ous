import { FC } from 'react';
import { useCommissionRates } from '@/hooks';
import { LANG } from '@/utils';
import { BandValue } from './bandValue';

type Props = {
  index: number;
  commission: number;
  qualifyingRevenueAmount: number;
};

export const Band: FC<Props> = ({ index, commission }: Props) => {
  const { data: commissionRates } = useCommissionRates({ willError: false });
  if (!commissionRates?.length) return null;

  const { min: bandMin, max: bandMax, rate } = commissionRates[index];

  return (
    <div className="bg-gray-50 rounded-md border border-gray-300 p-2 m-2 min-w-64 text-sm font-bold text-black">
      <div className="flex flex-row justify-between ">
        <BandValue
          value={bandMin}
          label={LANG['EN']['WIDGET.BAND.FROM']}
          symbol={LANG['EN']['CURRENCY_SYMBOL']}
          extraValue={!bandMax && !bandMax}
          extraSymbol={LANG['EN']['PLUS_SYMBOL']}
        />
        {!!bandMax && (
          <BandValue value={bandMax} label={LANG['EN']['WIDGET.BAND.TO']} symbol={LANG['EN']['CURRENCY_SYMBOL']} />
        )}
      </div>
      <div className="flex justify-between">
        <BandValue
          value={commission}
          label={LANG['EN']['WIDGET.BAND.COMMISSION_SUB']}
          symbol={LANG['EN']['CURRENCY_SYMBOL']}
          valueFontSize="text-4xl"
        />

        <BandValue
          value={rate}
          label={LANG['EN']['WIDGET.BAND.RATE']}
          symbol={LANG['EN']['PERCENT_SYMBOL']}
          symbolPosition="after"
        />
      </div>
    </div>
  );
};
