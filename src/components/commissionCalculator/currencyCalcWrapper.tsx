import { useCommissionRates } from '@/hooks';
import { CommissionCalcInner } from './currencyCalcInner';
import { LANG } from '@/utils';
import Widget from '../widget';
import { FC } from 'react';

type Props = {
  willError: boolean;
};

export const CommissionCalcWrapper: FC<Props> = ({ willError }: Props) => {
  // if willError is true, the hook will fail to fetch data
  // the fetch will re-run with an exponential backoff and eventually fail, only added for demo purposes
  const { isLoading, isError } = useCommissionRates({ willError });

  return (
    <Widget isLoading={isLoading} isError={isError} title={LANG['EN']['WIDGET.TITLE']}>
      <CommissionCalcInner />
    </Widget>
  );
};
