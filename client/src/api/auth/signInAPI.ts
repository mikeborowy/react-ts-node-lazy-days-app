import { User } from '../../../../shared/types';
import { UseCustomToast } from '../../app/common/hooks/useCustomToast';
import { postAuthAPI } from './postAuthAPI';

export interface SignInType {
  email: string;
  password: string;
  toast: UseCustomToast;
  updateUser: (newUser: User) => void;
}

export async function signInAPI({
  email,
  password,
  toast,
  updateUser,
}: SignInType): Promise<void> {
  postAuthAPI({
    urlEndpoint: '/signInAPI',
    email,
    password,
    toast,
    updateUser,
  });
}
