import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '85b7e368-d428-421d-a380-f8e707aa4267',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  }
}