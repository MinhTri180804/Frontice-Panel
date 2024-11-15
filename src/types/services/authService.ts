import { IBaseResponse } from "../base/response";
import { ILoginRequest } from "../request/login";
import { IInfoMeResponse } from "../response/info";
import { ILoginResponse } from "../response/login";

export type IAuthService = {
  login: (data: ILoginRequest) => Promise<IBaseResponse<ILoginResponse>>;
  infoMe: () => Promise<IBaseResponse<IInfoMeResponse>>;
};
