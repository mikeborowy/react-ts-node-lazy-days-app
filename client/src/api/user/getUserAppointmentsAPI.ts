import type { Appointment, User } from '../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../config/axiosInstance';

// query function
export async function getUserAppointmentsAPI(
  user: User | null,
): Promise<Appointment[] | null> {
  if (!user) return null;
  const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
    headers: getJWTHeader(user),
  });
  return data.appointments;
}
