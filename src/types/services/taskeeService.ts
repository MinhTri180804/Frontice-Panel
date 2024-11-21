import { IBaseResponse } from "../base/response";
import { IGetAllTaskeeInChallengeParams } from "../request/taskee";
import { IGetAllTaskeeInChallengeResponse } from "../response/taskee";

export interface ITaskeeService {
  getAllTaskeeInChallenge: (
    params: IGetAllTaskeeInChallengeParams,
  ) => Promise<IBaseResponse<IGetAllTaskeeInChallengeResponse>>;
}
