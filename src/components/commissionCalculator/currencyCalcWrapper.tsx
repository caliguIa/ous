import { useCommissionRates } from '../../hooks';
import { CommissionCalcInner } from './currencyCalcInner';
import { LANG } from '../../utils';
import Widget from '../widget';

export const CommissionCalcWrapper = () => {
  const { isLoading, isError } = useCommissionRates({ willError: false });

  return (
    <Widget isLoading={isLoading} isError={isError} title={LANG['EN']['WIDGET.TITLE']}>
      <CommissionCalcInner />
    </Widget>
  );
};
