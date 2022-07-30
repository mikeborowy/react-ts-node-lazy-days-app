import { postAuthAPI } from './postAuthAPI';
import { SignInType } from './signInAPI';

type SignUpType = SignInType;

export async function signUpAPI({
  email,
  password,
  toast,
  updateUser,
}: SignUpType): Promise<void> {
  postAuthAPI({ urlEndpoint: '/user', email, password, toast, updateUser });
}
