import jsonpatch from 'fast-json-patch';

import type { User } from '../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../config/axiosInstance';

// for when we need a server function
export async function patchUserAPI(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}
