import { useQueryClient } from 'react-query';

import { queryKeys } from '../../constants';
import { getTreatmentsAPI } from '../getTreatmentsAPI';

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatmentsAPI);
}
