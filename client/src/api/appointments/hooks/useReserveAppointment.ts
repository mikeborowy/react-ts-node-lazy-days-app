import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import { Appointment } from '../../../../shared/types';
import { useCustomToast } from '../../app/common/hooks/useCustomToast';
import { queryKeys } from '../constants';
import { useUser } from '../user/useUser';
import { patchAppointmentUserAPI } from './patchAppointmentUserAPI';

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
