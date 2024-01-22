import { FC, useMemo } from 'react';
import { Band } from './band';
import { useCommissionRates } from '@/hooks';
import { LANG } from '@/utils';
import { useRevenueValue } from '@/contexts/commission';

export const Breakdown: FC = () => {
  const { revenueValue, willError } = useRevenueValue();

  const { data: commission, isError } = useCommissionRates({ willError, value: revenueValue });
  const { commissionPerBand } = commission || {};

  const filteredCommissionBands = useMemo(
    () => (commissionPerBand || []).filter((band) => band.qualifyingRevenueAmount > 0),
    [commissionPerBand]
  );

  // TODO render loading state when retrying exponential backoff fetch
  if (isError) {
    return <div>{LANG['EN']['WIDGET.ERROR_RATES']}</div>;
  }

  if (!filteredCommissionBands.length) {
    return null;
  }

  // TODO fix re-render flicker when typing

  return (
    <div>
      <h4 className="font-bold">{LANG['EN']['WIDGET.BAND.TITLE']}</h4>
      <div className="flex justify-start flex-wrap">
        {filteredCommissionBands.map((band, i) => (
          <Band key={`${band.commissionRate.min}_min_band`} index={i} />
        ))}
      </div>
    </div>
  );
};
