import { PhotosType, ProfileType, UserType } from './../types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '85b7e368-d428-421d-a380-f8e707aa4267',
  },
});
type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export type FollowUnfollowType = {
  resultCode: ResultCode;
  data: {};
  message: Array<string>;
};
export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance
      .post<FollowUnfollowType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete<FollowUnfollowType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};

type UpdateStatusOrProfileType = {
  data: {};
  resultCode: ResultCode;
  messages: Array<string>;
  fieldsErrors: Array<string>;
};
type SaveMainAvatarType = {
  data: PhotosType;
  resultCode: number;
  messages: Array<string>;
};
export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status: string) {
    return instance
      .put<UpdateStatusOrProfileType>(`profile/status`, { status: status })
      .then((response) => response.data);
  },
  saveMainAvatar(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put<SaveMainAvatarType>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<UpdateStatusOrProfileType>(`profile`, profile)
      .then((response) => response.data);
  },
};

export enum ResultCode {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}
type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCode;
  messages: Array<string>;
};
type LoginResponseType = {
  data: {
    userId?: number;
  };
  resultCode: ResultCode | ResultCodeForCaptcha;
  messages: Array<string>;
};
export const authAPI = {
  me() {
    return instance
      .get<MeResponseType>(`auth/me`)
      .then((response) => response.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logout() {
    return instance
      .delete<LoginResponseType>(`auth/login`)
      .then((response) => response.data);
  },
};
type GetCaptchaUrlType = {
  url: string;
};
export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlType>(`security/get-captcha-url`)
      .then((response) => response.data.url);
  },
};
