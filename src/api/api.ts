import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '369bcd44-4414-4f27-bd8d-c3b6cdf99155',
  },
});

export enum ResultCode {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type ResponseType<D = {}, RC = ResultCode> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
