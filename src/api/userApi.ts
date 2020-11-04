import { UserType } from '../types/types';
import { instance, ResponseType } from './api';

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
