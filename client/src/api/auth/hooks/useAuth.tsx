import { useCustomToast } from '../../../app/common/hooks/useCustomToast';
import { useUser } from '../../user/hooks/useUser';
import { signInAPI } from '../signInAPI';
import { signUpAPI } from '../signOutAPI';
import { signOutAPI } from '../signUpAPI';

interface UseAuth {
  signInAPI: (email: string, password: string) => Promise<void>;
  signUpAPI: (email: string, password: string) => Promise<void>;
  signOutAPI: () => void;
}

export function useAuth(): UseAuth {
  const toast = useCustomToast();
  const { clearUser, updateUser } = useUser();

  // Return the user object and auth methods
  return {
    signInAPI: (email, password) =>
      signInAPI({ email, password, updateUser, toast }),
    signUpAPI: (email, password) =>
      signUpAPI({ email, password, updateUser, toast }),
    signOutAPI: () => signOutAPI({ clearUser, toast }),
  };
}
