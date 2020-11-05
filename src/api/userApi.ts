import { UserType } from '../types/types';
import { instance, ResponseType } from './api';

export const usersAPI = {
  getUsers(
    currentPage: number = 1,
    pageSize: number = 7,
    term: string = '',
    friend: null | boolean = null
  ) {
    return instance
      .get<GetUsersType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`)
      )
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
