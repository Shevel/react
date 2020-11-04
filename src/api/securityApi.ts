import { instance } from './api';

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlType>(`security/get-captcha-url`)
      .then((response) => response.data.url);
  },
};
type GetCaptchaUrlType = {
  url: string;
};
