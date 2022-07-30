import { AppointmentDateMap } from '../../app/views/appointments/types';
import { axiosInstance } from '../../config/axiosInstance';

// query function for useQuery call
export async function getAppointmentsAPI(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}
