import { IBaseResponse } from "../base/response";
import { IRefreshTokenRequest } from "../request/auth";
import { ILoginRequest } from "../request/login";
import { IRefreshTokenResponse } from "../response/auth";
import { IInfoMeResponse } from "../response/info";
import { ILoginResponse } from "../response/login";

export type IAuthService = {
  login: (data: ILoginRequest) => Promise<IBaseResponse<ILoginResponse>>;
  infoMe: () => Promise<IBaseResponse<IInfoMeResponse>>;
  refreshToken: (
    data: IRefreshTokenRequest,
  ) => Promise<IBaseResponse<IRefreshTokenResponse>>;
  logout: () => Promise<IBaseResponse<null>>;
};
