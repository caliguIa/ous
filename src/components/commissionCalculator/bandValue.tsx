import { FC } from 'react';

type Props = {
  value: number;
  symbol: string;
  label: string;
  extraValue?: boolean;
  extraSymbol?: string;
  symbolPosition?: 'before' | 'after';
  valueFontSize?: 'text-xl' | 'text-4xl';
};

export const BandValue: FC<Props> = ({
  value,
  symbol,
  label,
  extraValue,
  extraSymbol,
  symbolPosition = 'before',
  valueFontSize = 'text-xl',
}: Props) => {
  return (
    <div className="min-w-20">
      <p className="pr-1 flex flex-col">{label}</p>
      <p className={`pr-1 ${valueFontSize}`}>
        {symbolPosition === 'before' && symbol}
        {value}
        {extraValue && extraSymbol}
        {symbolPosition === 'after' && symbol}
      </p>
    </div>
  );
};
