import { useQuery } from 'react-query';

import type { Appointment } from '../../../../../shared/types';
import { queryKeys } from '../../constants';
import { getUserAppointmentsAPI } from '../getUserAppointmentsAPI';
import { useUser } from './useUser';

export function useUserAppointments(): Appointment[] {
  const { user } = useUser();

  const fallback: Appointment[] = [];
  const { data: userAppointments = fallback } = useQuery(
    [queryKeys.appointments, queryKeys.user, user?.id],
    () => getUserAppointmentsAPI(user),
    {
      enabled: !!user,
    },
  );

  return userAppointments;
}
