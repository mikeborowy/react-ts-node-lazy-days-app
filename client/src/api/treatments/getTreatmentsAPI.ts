import type { Treatment } from '../../../../shared/types';
import { axiosInstance } from '../../config/axiosInstance';

// for when we need a query function for useQuery
export async function getTreatmentsAPI(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}
