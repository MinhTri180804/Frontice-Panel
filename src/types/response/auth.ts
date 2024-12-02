import { IJwtToken } from "../entity/JwtToken";

export type IRefreshTokenResponse = IJwtToken & {
  token_type: string;
  expires_in: number;
};
