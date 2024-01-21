import { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { LANG } from '@/utils';

type Props = {
  revenueValue: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: FormEventHandler<HTMLButtonElement>;
};

export const Calculate: FC<Props> = ({ revenueValue, onClick, onChange }: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <label>{LANG['EN']['WIDGET.INPUT_LABEL']}</label>
        <input
          type="number"
          value={revenueValue}
          onChange={onChange}
          className="border-gray-300 border rounded-md p-3 "
        />
      </div>
      <button onClick={onClick} type="button" className="bg-blue-500 text-white rounded-md p-2 my-4">
        {LANG['EN']['WIDGET.INPUT_BUTTON']}
      </button>
    </>
  );
};
