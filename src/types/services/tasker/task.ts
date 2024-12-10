import { IBaseResponse } from "../../base/response";
import { IGetAllTaskParams } from "../../request/tasker/task";
import { IGetAllTaskResponse } from "../../response/tasker/task";

export type ITaskSerivce = {
  getAll: (
    params: IGetAllTaskParams,
  ) => Promise<IBaseResponse<IGetAllTaskResponse>>;
};
