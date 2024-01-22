import { Commission } from '@/schemas';
import { HttpResponse } from '@/schemas';
import { HEADERS, DB } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useCommission } from './useCommission';

type RatesFetch = HttpResponse<Commission>;

// error param here to demo error handling
export const useCommissionRates = ({ value, willError = false }: { value: number | undefined; willError: boolean }) => {
  return useQuery<unknown, unknown, Commission, ['commissionRates', { value: number | undefined; willError: boolean }]>(
    {
      queryKey: ['commissionRates', { willError, value }],
      queryFn: async () => {
        const ratesReq = new Promise<RatesFetch>((resolve, reject) => {
          const { userId } = HEADERS;
          if (value === undefined || value === null) {
            return {
              totalCommission: 0,
              commissionPerBand: [],
            };
          }
          const commissionRates = DB.companies[DB.users[userId].companyId].commissionRates;

          const commission = useCommission(value, commissionRates);

          if (willError) {
            reject({
              status: 400,
              data: null,
              error: 'Error calculating commission',
            });
          }

          if (!userId) {
            reject({
              status: 401,
              data: null,
              error: 'No user id provided',
            });
          }

          resolve({
            data: JSON.stringify(commission) as unknown as Commission,
            status: 200,
          });
        });
        // TODO use error/status to create non-generic frontend error messaging
        const { data } = await ratesReq;

        // TODO JSON.parse parses infinity as null
        return JSON.parse(data as unknown as string);
      },
      gcTime: Infinity,
      staleTime: Infinity,
    }
  );
};
