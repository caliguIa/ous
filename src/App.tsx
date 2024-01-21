import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommissionCalcWrapper from './components/commissionCalculator';
import { useCallback, useState } from 'react';

const App = () => {
  const queryClient = new QueryClient();
  const [willError, setWillError] = useState(false);
  const toggleError = useCallback(() => {
    setWillError((prev) => !prev);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CommissionCalcWrapper willError={willError} />
      </QueryClientProvider>
      <div className="p-4">
        <button className="rounded-md bg-blue-500 text-white w-40 h-10" onClick={toggleError}>
          Toggle Error
        </button>
        <div> {willError ? 'Will Error' : 'Will Not Error'}</div>
      </div>
    </>
  );
};

export default App;
