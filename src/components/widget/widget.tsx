import { FC } from 'react';

type Props = {
  children: JSX.Element;
  title: string;
  increaseMinHeight?: boolean;
};

export const Widget: FC<Props> = ({ children, title, increaseMinHeight = false }) => {
  // TODO:
  // - context for current language
  // - current lang switcher

  return (
    <div className="bg-gray-100 h-auto w-screen">
      <div className="bg-white h-auto w-100 p-4 m-5 rounded-md border border-gray-300">
        <h3 className="text-black text-lg font-black mb-5">{title}</h3>
        <div className={increaseMinHeight ? 'min-h-96' : 'min-h-64'}>{children}</div>
      </div>
    </div>
  );
};
