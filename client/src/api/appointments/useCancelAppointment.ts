import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import { Appointment } from '../../../../shared/types';
import { useCustomToast } from '../../app/common/hooks/useCustomToast';
import { axiosInstance } from '../../config/axiosInstance';
import { queryKeys } from '../constants';

// for when server call is needed
async function removeAppointmentUserAPI(
  appointment: Appointment,
): Promise<void> {
  const patchData = [{ op: 'remove', path: '/userId' }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

// TODO: update return type
export function useCancelAppointment(): UseMutateFunction<
  void,
  unknown,
  Appointment,
  unknown
> {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(removeAppointmentUserAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointments]);
      toast({
        title: 'You have canceled the appointment!',
        status: 'warning',
      });
    },
  });

  return mutate;
}
