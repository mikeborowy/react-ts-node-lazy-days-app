import { useQuery } from 'react-query';

import type { Appointment, User } from '../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../config/axiosInstance';
import { queryKeys } from '../constants';
import { useUser } from './useUser';

// query function
async function getUserAppointments(
  user: User | null,
): Promise<Appointment[] | null> {
  if (!user) return null;
  const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
    headers: getJWTHeader(user),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { user } = useUser();

  const fallback: Appointment[] = [];
  const { data: userAppointments = fallback } = useQuery(
    [queryKeys.appointments, queryKeys.user, user?.id],
    () => getUserAppointments(user),
    {
      enabled: !!user,
    },
  );

  return userAppointments;
}