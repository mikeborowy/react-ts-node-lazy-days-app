import { User } from '../../../../shared/types';
import { UseCustomToast } from '../../app/common/hooks/useCustomToast';
import { axiosInstance } from '../../config/axiosInstance';

const SERVER_ERROR = 'There was an error contacting the server.';

interface AuthServerCallType {
  urlEndpoint: string;
  email: string;
  password: string;
  toast: UseCustomToast;
  updateUser: (newUser: User) => void;
}

export async function postAuthAPI({
  urlEndpoint,
  email,
  password,
  toast,
  updateUser,
}: AuthServerCallType): Promise<void> {
  try {
    const { data, status } = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { email, password },
      headers: { 'Content-Type': 'application/json' },
    });

    if (status === 400) {
      toast({ title: data.message, status: 'warning' });
      return;
    }

    if (data?.user?.token) {
      toast({
        title: `Logged in as ${data.user.email}`,
        status: 'info',
      });

      // update stored user data
      updateUser(data.user);
    }
  } catch (errorResponse) {
    toast({
      title: errorResponse?.response?.data?.message || SERVER_ERROR,
      status: 'error',
    });
  }
}
