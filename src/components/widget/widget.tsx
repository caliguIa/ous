import { FC } from 'react';
import { LANG } from '../../utils';

type Props = {
  children: JSX.Element;
  isLoading: boolean;
  isError: boolean;
  title: string;
};

export const Widget: FC<Props> = ({ children, isLoading, isError, title }) => {
  // TODO context for current language

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="bg-white h-auto w-100 p-4 m-5 rounded-md border border-gray-300">
        <h3 className="text-black text-lg font-black mb-5">{title}</h3>
        <div className="min-h-64">
          {isLoading ? <div>{LANG['EN']['WIDGET.LOADING']}</div> : children}
          {isError && !isLoading && <div>{LANG['EN']['WIDGET.ERROR_RATES']}</div>}
        </div>
      </div>
    </div>
  );
};
