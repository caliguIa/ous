import { CommissionCalcInner } from './currencyCalcInner';
import { LANG } from '@/utils';
import Widget from '../widget';
import { FC } from 'react';
import { useRevenueValue } from '@/contexts/commission';

export const CommissionCalcWrapper: FC = () => {
  const { revenueValue } = useRevenueValue();

  return (
    <Widget title={LANG['EN']['WIDGET.TITLE']} increaseMinHeight={!!revenueValue}>
      <CommissionCalcInner />
    </Widget>
  );
};
