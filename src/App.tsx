import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Widget from './components/widget';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Widget />
      </QueryClientProvider>
    </>
  );
};

export default App;
