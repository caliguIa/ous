import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommissionCalcWrapper from './components/commissionCalculator';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CommissionCalcWrapper />
      </QueryClientProvider>
    </>
  );
};

export default App;
