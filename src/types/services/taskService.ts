import { IBaseResponse } from "../base/response";
import { IGetAllTaskParams, IGetDetailsTaskParams } from "../request/task";
import { IGetAllTaskResponse, IGetTaskDetailsResponse } from "../response/task";

export type ITaskService = {
  getAll: (
    params: IGetAllTaskParams,
  ) => Promise<IBaseResponse<IGetAllTaskResponse>>;

  getDetails: (
    params: IGetDetailsTaskParams,
  ) => Promise<IBaseResponse<IGetTaskDetailsResponse>>;
};
