import { FC } from 'react';
import { LANG } from '@/utils';
import { useCommissionRates } from '@/hooks';
import { useRevenueValue } from '@/contexts/commission';

export const TotalCommission: FC = () => {
  const { revenueValue, willError } = useRevenueValue();

  const { data: commission } = useCommissionRates({ willError, value: revenueValue });
  const { totalCommission } = commission || {};

  return (
    <div className="border border-gray-300 rounded-md p-3 my-4 w-fit">
      <h4 className="text-sm font-bold">{LANG['EN']['WIDGET.TOTAL_COMMISSION']}</h4>
      <p className="text-3xl font-bold">
        {LANG['EN']['CURRENCY_SYMBOL']}
        {totalCommission || 0}
      </p>
    </div>
  );
};
