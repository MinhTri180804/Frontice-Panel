import { IBaseResponse } from "../base/response";
import {
  IChangePasswordRequest,
  IRefreshTokenRequest,
  IRemoveFileRequest,
  IUpdateProfileMentorRequest,
  IUpdateProfileRequest,
} from "../request/auth";
import { ILoginRequest } from "../request/login";
import {
  IRefreshTokenResponse,
  IUpdateProfileResponse,
} from "../response/auth";
import { IInfoMeResponse } from "../response/info";
import { ILoginResponse } from "../response/login";

export type IAuthService = {
  login: (data: ILoginRequest) => Promise<IBaseResponse<ILoginResponse>>;
  infoMe: () => Promise<IBaseResponse<IInfoMeResponse>>;
  refreshToken: (
    data: IRefreshTokenRequest,
  ) => Promise<IBaseResponse<IRefreshTokenResponse>>;
  logout: () => Promise<IBaseResponse<null>>;
  updateProfile: (
    data: IUpdateProfileRequest | IUpdateProfileMentorRequest,
  ) => Promise<IBaseResponse<IUpdateProfileResponse>>;
  removeFile: (data: IRemoveFileRequest) => Promise<IBaseResponse<null>>;

  changePassword: (
    data: IChangePasswordRequest,
  ) => Promise<IBaseResponse<null>>;
};
