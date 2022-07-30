import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import { Appointment } from '../../../../shared/types';
import { useCustomToast } from '../../app/common/hooks/useCustomToast';
import { queryKeys } from '../constants';
import { removeAppointmentUserAPI } from './removeAppointmentUserAPI';

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
