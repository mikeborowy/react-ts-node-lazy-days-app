import { UseCustomToast } from '../../app/common/hooks/useCustomToast';

interface SignOutType {
  clearUser: () => void;
  toast: UseCustomToast;
}

export function signOutAPI({ clearUser, toast }: SignOutType): void {
  // clear user from stored user data
  clearUser();
  toast({
    title: 'Logged out!',
    status: 'info',
  });
}
