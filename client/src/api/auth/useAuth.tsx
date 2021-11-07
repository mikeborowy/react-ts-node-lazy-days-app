import { User } from '../../../../shared/types';
import {
  UseCustomToast,
  useCustomToast,
} from '../../app/common/hooks/useCustomToast';
import { axiosInstance } from '../../config/axiosInstance';
import { useUser } from '../user/useUser';

const SERVER_ERROR = 'There was an error contacting the server.';

interface AuthServerCallType {
  urlEndpoint: string;
  email: string;
  password: string;
  toast: UseCustomToast;
  updateUser: (newUser: User) => void;
}

async function authServerCall({
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

interface SignInType {
  email: string;
  password: string;
  toast: UseCustomToast;
  updateUser: (newUser: User) => void;
}

async function signIn({
  email,
  password,
  toast,
  updateUser,
}: SignInType): Promise<void> {
  authServerCall({
    urlEndpoint: '/signIn',
    email,
    password,
    toast,
    updateUser,
  });
}

type SignUpType = SignInType;

async function signUp({
  email,
  password,
  toast,
  updateUser,
}: SignUpType): Promise<void> {
  authServerCall({ urlEndpoint: '/user', email, password, toast, updateUser });
}

interface SignOutType {
  clearUser: () => void;
  toast: UseCustomToast;
}

function signOut({ clearUser, toast }: SignOutType): void {
  // clear user from stored user data
  clearUser();
  toast({
    title: 'Logged out!',
    status: 'info',
  });
}

interface UseAuth {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export function useAuth(): UseAuth {
  const toast = useCustomToast();
  const { clearUser, updateUser } = useUser();

  // Return the user object and auth methods
  return {
    signIn: (email, password) => signIn({ email, password, updateUser, toast }),
    signUp: (email, password) => signUp({ email, password, updateUser, toast }),
    signOut: () => signOut({ clearUser, toast }),
  };
}
