import { useRevenueValue, useRevenueValueDispatch } from '@/contexts/commission';
import { useCallback } from 'react';

export const ToggleError = () => {
  const { setWillError } = useRevenueValueDispatch();
  const { willError } = useRevenueValue();

  const toggleError = useCallback(() => {
    setWillError((prev: boolean) => !prev);
  }, []);

  return (
    <div className="p-4">
      <button className="rounded-md bg-blue-500 text-white w-40 h-10" onClick={toggleError}>
        Toggle Error
      </button>
      <div>
        {willError
          ? 'Will Error, please wait 15s for exponential backoff to finish retrying mock fetch'
          : 'Will Not Error'}
      </div>
    </div>
  );
};
