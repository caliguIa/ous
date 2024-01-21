import { CommissionRates } from '../schemas';
import { HttpResponse } from '../schemas';
import { COMMISSION_RATES_RESPONSE } from '../utils';
import { useQuery } from '@tanstack/react-query';

type RatesFetch = HttpResponse<CommissionRates>;

// error param here to demo error handling
export const useCommissionRates = ({ willError = false }: { willError: boolean }) => {
  return useQuery<unknown, unknown, CommissionRates, ['commissionRates', { willError: boolean }]>({
    queryKey: ['commissionRates', { willError }],
    queryFn: async () => {
      const ratesReq = new Promise<RatesFetch>((resolve, reject) => {
        setTimeout(() => {
          if (willError) {
            reject({
              status: 400,
              data: null,
              error: 'Something went wrong',
            });
          }
          resolve({
            data: COMMISSION_RATES_RESPONSE,
            status: 200,
          });
        }, 2000);
      });
      // TODO use error/status to create non-generic frontend error messaging
      const { data } = await ratesReq;

      // TODO JSON.parse parses infinity as null
      return JSON.parse(data as unknown as string);
    },
    gcTime: Infinity,
    staleTime: Infinity,
  });
};
