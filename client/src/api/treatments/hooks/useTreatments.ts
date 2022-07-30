import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { queryKeys } from '../../constants';
import { getTreatmentsAPI } from '../getTreatmentsAPI';

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatmentsAPI);
  return data;
}
