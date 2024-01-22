import { ChangeEventHandler, FC, useCallback } from 'react';
import { LANG } from '@/utils';
import { useRevenueValue, useRevenueValueDispatch } from '@/contexts/commission';

export const Calculate: FC = () => {
  const { revenueValue } = useRevenueValue();
  const { setRevenueValue } = useRevenueValueDispatch();

  const hanndleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setRevenueValue(+e.target.value);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <label>{LANG['EN']['WIDGET.INPUT_LABEL']}</label>
        <input
          type="number"
          value={revenueValue || ''}
          onChange={hanndleInputChange}
          className="border-gray-300 border rounded-md p-3 "
        />
      </div>
    </>
  );
};
