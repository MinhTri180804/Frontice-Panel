import axiosClient from "../axios/axiosClient";
import { constantAuthApi } from "../constants/api/auth";
import { ILoginRequest } from "../types/request/login";
import { IAuthService } from "../types/services/authService";

const DEFAULT_URL_API = "auth";

const authService: IAuthService = {
  login: (data: ILoginRequest) => {
    return axiosClient.post(
      `/${DEFAULT_URL_API}/${constantAuthApi.login}`,
      data,
    );
  },

  infoMe: () => {
    return axiosClient.get(`/${DEFAULT_URL_API}/me`);
  },
};

export default authService;
