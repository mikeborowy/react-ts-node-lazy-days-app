import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../utils/user-storage';
import { queryKeys } from '../../constants';
import { getUserAPI } from '../getUserAPI';

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const queryClient = useQueryClient();

  // call useQuery to update user data from server
  useQuery(queryKeys.user, () => getUserAPI(user), {
    enabled: !!user,
    // updating onSuccess based on changes in React Query
    // see https://www.udemy.com/course/learn-react-query/learn/#questions/15581842/ for more details
    // onSuccess: (axiosResponse) => setUser(axiosResponse?.data?.user)
    onSuccess: (data: User) => setUser(data),
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // set user in state
    setUser(newUser);

    // update user in localstorage
    setStoredUser(newUser);

    // pre-populate user profile in React Query client
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // update state
    setUser(null);

    // remove from localstorage
    clearStoredUser();

    // reset user to null in query client
    queryClient.setQueryData(queryKeys.user, null);

    // remove user appointments query
    queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}
