import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import { Appointment } from '../../../../shared/types';
import { useCustomToast } from '../../app/common/hooks/useCustomToast';
import { axiosInstance } from '../../config/axiosInstance';
import { queryKeys } from '../constants';
import { useUser } from '../user/useUser';

async function patchAppointmentUserAPI(
  appointment: Appointment,
  userId: number | undefined,
): Promise<void> {
  if (!userId) return;
  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

export function useReserveAppointment(): UseMutateFunction<
  void,
  unknown,
  Appointment,
  unknown
> {
  const { user } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (appointment: Appointment) =>
      patchAppointmentUserAPI(appointment, user?.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.appointments]);
        toast({
          title: 'You have reserved the appointment!',
          status: 'success',
        });
      },
    },
  );

  return mutate;
}
