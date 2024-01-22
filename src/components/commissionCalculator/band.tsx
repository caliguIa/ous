import { FC } from 'react';
import { useCommissionRates } from '@/hooks';
import { LANG } from '@/utils';
import { BandValue } from './bandValue';
import { useRevenueValue } from '@/contexts/commission';

type Props = {
  index: number;
};

export const Band: FC<Props> = ({ index }: Props) => {
  const { revenueValue, willError } = useRevenueValue();

  const { data: commission } = useCommissionRates({ willError, value: revenueValue });
  const { commissionPerBand } = commission || {};

  if (!commissionPerBand?.length) return null;

  const band = commissionPerBand[index];
  const { min: bandMin, max: bandMax, rate } = band.commissionRate;
  const { commission: commissionValue } = band;

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
          value={commissionValue}
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
