import {
  IGetAllChallengeParams,
  IGetDetailsChallengeParams,
  IRemoveChallengeParams,
} from "../request/challenge";
import { IBaseResponse } from "../base/response";
import { IGetAllChallengeResponse } from "../response/challenge";

export type IChallengeService = {
  getAll: (
    params: IGetAllChallengeParams,
  ) => Promise<IBaseResponse<IGetAllChallengeResponse>>;
  // getDetails: (params: IGetDetailsChallengeParams) => Promise<IBaseResponse<>>;

  remove: (params: IRemoveChallengeParams) => Promise<IBaseResponse<null>>;
};
