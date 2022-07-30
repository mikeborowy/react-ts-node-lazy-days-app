import type { Staff } from '../../../../shared/types';
import { axiosInstance } from '../../config/axiosInstance';

export async function getStaffAPI(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}
