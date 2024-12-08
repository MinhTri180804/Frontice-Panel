import { IJwtToken } from "../entity/JwtToken";
import { IMeInfo } from "../entity/meInfo";

export type IRefreshTokenResponse = IJwtToken & {
  token_type: string;
  expires_in: number;
};

export type IUpdateProfileResponse = IMeInfo;
