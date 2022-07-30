import axios, { AxiosResponse } from 'axios';

import type { User } from '../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../config/axiosInstance';

interface AxiosResponseWithCancel extends AxiosResponse {
  cancel: () => void;
}

// query function
export async function getUserAPI(
  user: User | null,
): Promise<AxiosResponseWithCancel> {
  const source = axios.CancelToken.source();

  if (!user) return null;
  const axiosResponse: AxiosResponseWithCancel = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
      cancelToken: source.token,
    },
  );

  axiosResponse.cancel = () => {
    source.cancel();
  };

  return axiosResponse;
}
