import axios from 'axios';
import { ENV } from '../constant/env';

export const instance = axios.create({
  withCredentials: true,
  baseURL: ENV.BASE_URL,
  headers: {
    'API-KEY': ENV.API_KEY,
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
