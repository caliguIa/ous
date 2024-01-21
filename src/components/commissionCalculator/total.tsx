import { FC } from 'react';
import { LANG } from '../../utils';

type Props = {
  totalCommission: number;
};

export const TotalCommission: FC<Props> = ({ totalCommission }: Props) => {
  return (
    <div className="border border-gray-300 rounded-md p-3 my-4 w-fit">
      <h4 className="text-sm font-bold">{LANG['EN']['WIDGET.TOTAL_COMMISSION']}</h4>
      <p className="text-3xl font-bold">
        {LANG['EN']['CURRENCY_SYMBOL']}
        {totalCommission}
      </p>
    </div>
  );
};
