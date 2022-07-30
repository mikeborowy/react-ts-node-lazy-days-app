import { Appointment } from '../../../../shared/types';
import { axiosInstance } from '../../config/axiosInstance';

// for when server call is needed
export async function removeAppointmentUserAPI(
  appointment: Appointment,
): Promise<void> {
  const patchData = [{ op: 'remove', path: '/userId' }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}
