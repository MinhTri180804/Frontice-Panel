import { IBaseResponse } from "../base/response";
import {
  IGetAllTaskSolutionParams,
  IGetSolutionByTaskIdParams,
} from "../request/solution";
import {
  IGetAllTaskSolutionResponse,
  IGetSolutionsByTaskIdResponse,
} from "../response/soltuion";

export type ITaskSolutionService = {
  getAll: (
    params: IGetAllTaskSolutionParams,
  ) => Promise<IBaseResponse<IGetAllTaskSolutionResponse>>;

  getByIdTask: (
    params: IGetSolutionByTaskIdParams,
  ) => Promise<IBaseResponse<IGetSolutionsByTaskIdResponse>>;
};
