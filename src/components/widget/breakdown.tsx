import { FC, useMemo } from 'react';
import { Band } from './band';
import { CommissionBand } from '../../schemas';
import { useCommissionRates } from '../../hooks';
import { LANG } from '../../utils';

type Props = {
  commissionPerBand: CommissionBand[];
};

export const Breakdown: FC<Props> = ({ commissionPerBand }: Props) => {
  const { data: commissionRates, isError } = useCommissionRates({ willError: false });

  const filteredCommissionBands = useMemo(
    () => commissionPerBand.filter((band) => band.qualifyingRevenueAmount > 0),
    [commissionPerBand]
  );

  if (isError || !commissionRates?.length) {
    return <div>{LANG['EN']['WIDGET.ERROR_RATES']}</div>;
  }

  if (!filteredCommissionBands.length) {
    return null;
  }

  return (
    <div>
      <h4 className="font-bold">{LANG['EN']['WIDGET.BAND.TITLE']}</h4>
      <div className="flex justify-start flex-wrap">
        {filteredCommissionBands.map((band, i) => (
          <Band
            key={`${commissionRates[i].min}_min_band`}
            index={i}
            commission={band.commission}
            qualifyingRevenueAmount={band.qualifyingRevenueAmount}
          />
        ))}
      </div>
    </div>
  );
};
