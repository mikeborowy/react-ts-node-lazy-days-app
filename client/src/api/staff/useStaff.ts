import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../shared/types';
import { filterByTreatment } from '../../app/views/staff/utils';
import { axiosInstance } from '../../config/axiosInstance';
import { queryKeys } from '../constants';

async function getStaffAPI(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');
  const selectFn = useCallback(
    (unfilteredStaff) => filterByTreatment(unfilteredStaff, filter),
    [filter],
  );

  const fallback = [];
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaffAPI, {
    select: filter !== 'all' ? selectFn : undefined,
  });

  return { staff, filter, setFilter };
}
