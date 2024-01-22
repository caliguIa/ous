import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommissionCalcWrapper from './components/commissionCalculator';
import ToggleError from './components/mockError';
import CommissionValuesWrapper from './contexts/commission';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <CommissionValuesWrapper>
        <QueryClientProvider client={queryClient}>
          <CommissionCalcWrapper />
        </QueryClientProvider>
        <ToggleError />
      </CommissionValuesWrapper>
    </>
  );
};

export default App;
